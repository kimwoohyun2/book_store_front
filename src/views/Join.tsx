import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Join() {
  // useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [interest, setInterest] = useState("");

  // useRef
  const password2 = useRef<HTMLInputElement | null>(null);

  // useNavigate
  const navigate = useNavigate();

  // method
  const clickBack = () => {
    navigate(-1);
  };

  // 가입하기 버튼 클릭 시
  const clickJoin = async () => {
    // 비밀번호 일치여부 체크
    if (password !== password2.current?.value) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!email.includes("@")) {
      alert("이메일 형식이 아닙니다.");
      return;
    }

    let regPass = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,100}$/;

    if (!regPass.test(password)) {
      alert(
        "비밀번호는 영문, 숫자, 특수기호 조합으로 8자리 이상 입력해주세요."
      );
      return;
    }

    if (!fullname || !birthdate || !address) {
      alert("필수입력사항을 모두 입력해주십시오.");
      return;
    }

    try {
      // 회원가입 api 호출
      const res = await axios.post("http://52.79.177.224:8081/api/v1/join", {
        username: email,
        password: password,
        fullname: fullname,
        birthdate: birthdate,
        roles: "",
        adminYn: "N",
        address: address,
        interest: interest,
      });

      if (!res || !res.data || res.status !== 200) {
        alert("[오류] 회원가입에 실패하였습니다.");

        // ---------------------------------------
      } else if (res.data === "already") {
        alert("이미 가입된 username입니다.");

        // ---------------------------------------
      } else {
        alert("회원가입되었습니다.");
        navigate("/main/list");
      }
    } catch (err) {
      alert("[오류] 회원가입에 실패하였습니다.");
      console.log("Join.tsx > error:", err);
    }
  };

  return (
    <>
      <header className="join_membership">
        <h1 className="join_h1">
          <Link to="/main/list" className="join_h1_title">
            BookStore
          </Link>
        </h1>
      </header>
      <div className="join_container">
        <div className="content">
          <div className="join_content">
            <div className="row_group">
              <div className="join_row">
                <h3 className="join_title">
                  <label htmlFor="email">
                    <span>이메일주소</span>
                    <span className="red_font"> (필수)</span>
                  </label>
                </h3>
                <span className="ps_box">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="int"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </span>
              </div>
              <div className="join_row">
                <h3 className="join_title">
                  <label htmlFor="pswd1">
                    <span>비밀번호</span>
                    <span className="red_font"> (필수)</span>
                  </label>
                </h3>
                <span className="ps_box">
                  <input
                    type="password"
                    className="int"
                    id="pswd1"
                    name="pswd1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </span>
              </div>
              <div className="join_row">
                <h3 className="join_title">
                  <label htmlFor="pswd2">
                    <span>비밀번호 재확인</span>
                    <span className="red_font"> (필수)</span>
                  </label>
                </h3>
                <span className="ps_box">
                  <input
                    type="password"
                    className="int"
                    id="pswd2"
                    name="pswd2"
                    ref={password2}
                  ></input>
                </span>
              </div>
              <div className="join_row">
                <h3 className="join_title">
                  <label htmlFor="fullname">
                    <span>이름</span>
                    <span className="red_font"> (필수)</span>
                  </label>
                </h3>
                <span className="ps_box">
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    className="int"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  ></input>
                </span>
              </div>
              <div className="join_row">
                <h3 className="join_title">
                  <label htmlFor="birthdate">
                    <span>생년월일</span>
                    <span className="red_font"> (필수)</span>
                  </label>
                </h3>
                <span className="ps_box">
                  <input
                    type="number"
                    id="birthdate"
                    name="birthdate"
                    className="int"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    maxLength={8}
                  ></input>
                </span>
              </div>
              <div className="join_row">
                <h3 className="join_title">
                  <label htmlFor="address">
                    <span>집주소</span>
                    <span className="red_font"> (필수)</span>
                  </label>
                </h3>
                <span className="ps_box">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="int"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></input>
                </span>
              </div>
              <div className="join_row">
                <h3 className="join_title">
                  <label htmlFor="interest">
                    <span>관심사</span>
                    <span className="red_font"> (선택)</span>
                  </label>
                </h3>
                <span className="ps_box">
                  <input
                    type="text"
                    id="interest"
                    name="interest"
                    className="int"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    onKeyDown={(e) => (e.key === "Enter" ? clickJoin() : null)}
                  ></input>
                </span>
              </div>
            </div>
            <div className="btn_login_wrap">
              <button type="submit" className="btn_login" onClick={clickJoin}>
                <span className="btn_text">가입하기</span>
              </button>
              <button
                type="submit"
                className="btn_login"
                onClick={() => navigate(-1)}
              >
                <span className="btn_text" onClick={clickBack}>
                  뒤로 가기
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Join;

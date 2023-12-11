import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  setUsername,
  setFullname,
  setJwt,
  setRoles,
} from "../store/modules/common";

function Login() {
  // useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useRef
  const inputRef = useRef<HTMLInputElement | null>(null);

  // useNavigate
  const navigate = useNavigate();

  // useDispatch
  const dispatch = useDispatch();

  // useEffect
  useEffect(() => {
    // 로그인화면 시작 시 이메일주소 입력란에 포커스가 가도록 처리.
    inputRef.current?.focus();
  }, []);

  // method
  const inputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const inputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const clickJoin = () => {
    navigate("/join");
  };

  const clickLogin = async () => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>  Login.tsx  21");

    // if (!email.includes("@")) {
    //   alert("이메일 형식이 아닙니다.");
    //   return;
    // }

    try {
      // 로그인 api 호출
      const res = await axios.post("http://52.79.177.224:8081/login", {
        username: email,
        password: password,
      });

      if (!res || !res.data || res.status !== 200) {
        dispatch(setUsername(""));
        dispatch(setFullname(""));
        dispatch(setJwt(""));
        dispatch(setRoles(""));

        alert("[오류] 로그인에 실패하였습니다.");
      }

      // 따로 유효시간을 정하지 않고 쿠키를 저장한다.
      //   -> 이렇게 하면 브라우저가 닫힐 때 쿠키가 자동삭제된다.
      document.cookie = "jwt_key_bookstore_one=" + res.data.jwt;
      document.cookie = "roles_bookstore_one=" + res.data.roles;
      document.cookie = "username_bookstore_one=" + email;
      document.cookie =
        "fullname_bookstore_one=" + decodeURIComponent(res.data.fullname);

      // (로그인 성공 시)
      // 회원의 username(이메일주소), 이름, jwt키, role값을 store에 저장한다.
      dispatch(setUsername(email));
      dispatch(setFullname(decodeURIComponent(res.data.fullname)));
      dispatch(setJwt(res.data.jwt));
      dispatch(setRoles(res.data.roles));

      navigate("/main/list");

      // -----------------------------------------------------
    } catch (err) {
      dispatch(setUsername(""));
      dispatch(setFullname(""));
      dispatch(setJwt(""));
      dispatch(setRoles(""));

      alert("[오류] 아이디 또는 비밀번호가 맞지 않습니다.");
      console.log("Login.tsx > error:", err);
    }
  };

  return (
    <>
      <header className="login_header">
        <div className="login_header_inner">
          <Link to="/main/list" className="logo">
            BookStore
          </Link>
        </div>
      </header>
      <div className="login_wrap">
        <div className="panel_inner">
          <div className="id_pw_wrap">
            <div className="input_row">
              <input
                type="text"
                className="input_text"
                placeholder="이메일주소"
                title="이메일주소"
                ref={inputRef}
                value={email}
                onChange={inputEmail}
              />
            </div>
            <div className="input_row">
              <input
                type="password"
                className="input_text"
                placeholder="비밀번호"
                title="비밀번호"
                value={password}
                onChange={inputPassword}
                onKeyDown={(e) => (e.key === "Enter" ? clickLogin() : null)}
              />
            </div>
            <div className="btn_login_wrap">
              <button type="submit" className="btn_login" onClick={clickLogin}>
                <span className="btn_text">로그인</span>
              </button>
              <button type="submit" className="btn_login" onClick={clickJoin}>
                <span className="btn_text">회원가입</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

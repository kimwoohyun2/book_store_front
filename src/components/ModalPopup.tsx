import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import axios from "axios";

function ModalPopup({ setModalOpen }: any) {
  // useSelector  -------------------------------------------------------------------
  const { bookOne, isBookAdd } = useSelector(
    (state: RootState) => state.bookList
  );

  // useDispatch
  const dispatch = useDispatch();

  // useState
  const [bookTitle, setBookTitle] = useState("");
  const [bookDesc, setBookDesc] = useState("");
  const [bookImage, setBookImage] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookPublisher, setBookPublisher] = useState("");
  const [bookPubDate, setBookPubDate] = useState("");
  const [bookPageNo, setBookPageNo] = useState("");
  const [bookPrice, setBookPrice] = useState("");

  // useRef
  const modalRef = useRef<HTMLDivElement | null>(null);

  // useEffect
  useEffect(() => {
    if (!isBookAdd) {
      // 도서 수정
      setBookTitle(bookOne.bookTitle);
      setBookDesc(bookOne.bookDesc);
      setBookImage(bookOne.bookImage);
      setBookAuthor(bookOne.bookAuthor);
      setBookPublisher(bookOne.bookPublisher);
      setBookPubDate(bookOne.bookPubDate);
      setBookPageNo(bookOne.bookPageNo);
      setBookPrice(bookOne.bookPrice);
    }

    // 이벤트 핸들러 함수
    const mousedownHandler = (event: any) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        dispatch(setModalOpen(false));
      }
    };

    const keydownHandler = (event: any) => {
      if (event.key === "Escape") {
        dispatch(setModalOpen(false));
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", mousedownHandler);
    window.addEventListener("keydown", keydownHandler);

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", mousedownHandler);
      document.removeEventListener("keydown", keydownHandler);
    };
  }, []);

  // method

  // 추가 또는 수정 api를 호출한다.
  const callApi = async () => {
    // validation 체크
    if (!bookTitle) {
      alert("도서 제목은 필수로 입력하여 주십시오.");
      return;
    }

    try {
      let res;

      if (isBookAdd) {
        // 도서 추가 api 호출
        // const res = await axios.post("http://13.125.112.126:8081/book/addBook", {
        res = await axios.post("http://13.125.112.126:8081/book/addBook", {
          bookTitle: bookTitle,
          bookDesc: bookDesc,
          bookImage: "",
          bookAuthor: bookAuthor,
          bookPublisher: bookPublisher,
          bookPubDate: bookPubDate,
          bookPageNo: bookPageNo,
          bookPrice: bookPrice,
        });
      } else {
        // 도서 수정 api 호출
        // const res = await axios.post("http://13.125.112.126:8081/book/addBook", {
        res = await axios.post("http://13.125.112.126:8081/book/updateBook", {
          bookNo: bookOne.bookNo,
          bookTitle: bookTitle,
          bookDesc: bookDesc,
          bookImage: bookImage,
          bookAuthor: bookAuthor,
          bookPublisher: bookPublisher,
          bookPubDate: bookPubDate,
          bookPageNo: bookPageNo,
          bookPrice: bookPrice,
        });
      }

      if (!res || !res.data || res.status !== 200) {
        alert("오류가 발생했습니다.");

        return;
      }

      alert("정상 처리되었습니다.");

      dispatch(setModalOpen(false));

      // -----------------------------------------------------
    } catch (err) {
      alert("오류가 발생했습니다.");
      console.log("ModalPopup.tsx > error:", err);
    }
  };

  return (
    <div className="container-popup" ref={modalRef}>
      <div className="join_container">
        <div className="content">
          <div className="join_content">
            <div className="row_group">
              <div className="join_row">
                <h3 className="join_title">
                  <label htmlFor="book_title">
                    <span>도서 제목</span>
                    <span className="red_font"> (필수)</span>
                  </label>
                </h3>
                <span className="ps_box">
                  <input
                    type="text"
                    id="book_title"
                    name="book_title"
                    className="int"
                    placeholder="도서 제목을 입력해주세요."
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                  ></input>
                </span>
              </div>
              <div className="join_row">
                <h3 className="join_title">
                  <label htmlFor="book_desc">
                    <span>도서 설명</span>
                    <span className="red_font"> (선택)</span>
                  </label>
                </h3>
                <span className="ps_box">
                  <input
                    type="text"
                    id="book_desc"
                    name="book_desc"
                    className="int"
                    placeholder="도서 설명을 입력해주세요."
                    value={bookDesc}
                    onChange={(e) => setBookDesc(e.target.value)}
                  ></input>
                </span>
              </div>
              <div className="join_row">
                <h3 className="join_title">
                  <label htmlFor="book_author">
                    <span>도서 저자</span>
                    <span className="red_font"> (선택)</span>
                  </label>
                </h3>
                <span className="ps_box">
                  <input
                    type="text"
                    id="book_author"
                    name="book_author"
                    className="int"
                    placeholder="도서 저자를 입력해주세요."
                    value={bookAuthor}
                    onChange={(e) => setBookAuthor(e.target.value)}
                  ></input>
                </span>
              </div>
              <div className="join_row">
                <h3 className="join_title">
                  <label htmlFor="book_publisher">
                    <span>도서 출판사</span>
                    <span className="red_font"> (선택)</span>
                  </label>
                </h3>
                <span className="ps_box">
                  <input
                    type="text"
                    id="book_publisher"
                    name="book_publisher"
                    className="int"
                    placeholder="도서 출판사를 입력해주세요."
                    value={bookPublisher}
                    onChange={(e) => setBookPublisher(e.target.value)}
                  ></input>
                </span>
              </div>
              <div className="join_row">
                <h3 className="join_title">
                  <label htmlFor="book_pub_date">
                    <span>도서 출판일</span>
                    <span className="red_font"> (선택)</span>
                  </label>
                </h3>
                <span className="ps_box">
                  <input
                    type="number"
                    id="book_pub_date"
                    name="book_pub_date"
                    className="int"
                    placeholder="숫자만 입력해주세요. (ex) 19601230"
                    value={bookPubDate}
                    onChange={(e) => setBookPubDate(e.target.value)}
                    maxLength={8}
                    onInput={(e: any) => {
                      if (e.target.value.length > e.target.maxLength)
                        e.target.value = e.target.value.slice(
                          0,
                          e.target.maxLength
                        );
                    }}
                  ></input>
                </span>
              </div>
              <div className="join_row">
                <h3 className="join_title">
                  <label htmlFor="book_page_no">
                    <span>도서 페이지수</span>
                    <span className="red_font"> (선택)</span>
                  </label>
                </h3>
                <span className="ps_box">
                  <input
                    type="number"
                    id="book_page_no"
                    name="book_page_no"
                    className="int"
                    placeholder="숫자만 입력해주세요. (ex) 261"
                    value={bookPageNo}
                    onChange={(e) => {
                      setBookPageNo(e.target.value);
                    }}
                  ></input>
                </span>
              </div>
              <div className="join_row">
                <h3 className="join_title">
                  <label htmlFor="book_price">
                    <span>도서 가격</span>
                    <span className="red_font"> (선택)</span>
                  </label>
                </h3>
                <span className="ps_box">
                  <input
                    type="number"
                    id="book_price"
                    name="book_price"
                    className="int"
                    placeholder="숫자만 입력해주세요. (ex) 27000"
                    value={bookPrice}
                    onChange={(e) => setBookPrice(e.target.value)}
                    onKeyDown={(e) => (e.key === "Enter" ? callApi() : null)}
                  ></input>
                </span>
              </div>
            </div>
            <div className="btn_login_wrap">
              <button className="btn_login" onClick={callApi}>
                <span className="btn_text">
                  {isBookAdd ? "신규 도서 추가하기" : "도서 수정하기"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ModalPopup;

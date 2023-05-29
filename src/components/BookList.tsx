import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { Book } from "../types/global";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import {
  setBookOne,
  setIsBookAdd,
  setSearchedBookList,
  setBasketBookList,
} from "../store/modules/bookList";
import { setModalOpen } from "../store/modules/common";
import { getBookList } from "../common/function";

function BookList() {
  // useSelector
  const { username, jwt, roles } = useSelector(
    (state: RootState) => state.common
  );

  const { searchData, searchedBookList, basketBookList } = useSelector(
    (state: RootState) => state.bookList
  );

  // useNavigate
  const navigate = useNavigate();

  // useDispatch
  const dispatch = useDispatch();

  // useEffect
  useEffect(() => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>  BookList.tsx  33");
    console.log(searchedBookList);
  }, []);

  // method
  const clickUpdate = (paramItem: Book) => {
    dispatch(setBookOne(paramItem));
    dispatch(setModalOpen(true));
    dispatch(setIsBookAdd(false));
  };

  const checkHandler = (paramIndex: number, { target }: any) => {
    const copySearchedBookList = JSON.parse(JSON.stringify(searchedBookList));
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>  BookList.tsx  46");
    console.dir(target.checked);

    // target.checked 값은 before, after 중 after값이다.
    copySearchedBookList[paramIndex].isCheck = target.checked;

    dispatch(setSearchedBookList(copySearchedBookList));
  };

  const clickDelete = async () => {
    const copySearchedBookList = JSON.parse(JSON.stringify(searchedBookList));

    // searchedBookList 에서 체크박스 체크된 항목만 가져온다.
    const filteredSearchedBookList = copySearchedBookList.filter(
      (item: Book) => item.isCheck === true
    );

    if (filteredSearchedBookList.length === 0) {
      alert("삭제할 도서를 선택하십시오.");
      return;
    }

    try {
      // 도서 삭제 api 호출
      const res = await axios.post(
        "http://13.125.112.126:8081/book/deleteBook",
        // "http://localhost:8081/book/deleteBook",
        filteredSearchedBookList
      );

      if (!res || !res.data || res.status !== 200) {
        alert("오류가 발생했습니다.");

        return;
      }

      alert("정상 처리되었습니다.");

      const resData = await getBookList(searchData);

      if (!resData) {
        return;
      }

      // 스토어에 넣는다.
      dispatch(setSearchedBookList(resData));

      // -----------------------------------------------------
    } catch (err) {
      alert("오류가 발생했습니다.");
      console.log("ModalPopup.tsx > error:", err);
    }
  };

  // // 장바구니담기 버튼 클릭 시
  const clickBasket = () => {
    // store에 jwt값이 없으면 비로그인 상태이다.
    //   -> 왜냐하면 jwt key가 쿠키에 저장되어 있지 않으면 비로그인상태인데
    //      쿠키와 store는 항상 동기화되게끔 코딩했기 때문이다.
    // if (!document.cookie.includes("jwt_key_bookstore_one=")) {
    if (!jwt) {
      alert("장바구니에 담으려면 로그인이 필요합니다.");

      // 로그인 페이지로 이동
      navigate("/login");

      return;
    }

    const copySearchedBookList = JSON.parse(JSON.stringify(searchedBookList));
    const copyBasketBookList = JSON.parse(JSON.stringify(basketBookList));

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>  BookList.tsx  117");
    console.log(searchedBookList);

    // searchedBookList 에서 체크박스 체크된 항목만 가져온다.
    const filteredSearchedBookList = copySearchedBookList.filter(
      (item: Book) => item.isCheck === true
    );

    if (filteredSearchedBookList.length === 0) {
      alert("장바구니에 담을 도서를 선택하십시오.");
      return;
    }

    for (const item of filteredSearchedBookList) {
      // 중복 flag
      let dupFlag = false;
      for (const content of copyBasketBookList) {
        if (item.bookNo === content.bookNo) {
          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>  BookList.tsx  135");
          // alert("이미 같은 상품이 장바구니에 있습니다.");
          dupFlag = true;
          break;
        }
      }

      if (!dupFlag) {
        // 해당 도서가 장바구니 리스트에 없으므로 push
        copyBasketBookList.push(item);
      }
    }

    // for (const item of copyBasketBookList) {
    //   if (paramItem.bookNo === item.bookNo) {
    //     alert("이미 같은 상품이 장바구니에 있습니다.");
    //     return;
    //   }
    // }

    // copyBasketBookList.push(paramItem);

    dispatch(setBasketBookList(copyBasketBookList));

    alert("장바구니 페이지로 이동합니다.");

    // 장바구니 페이지로 이동
    navigate("/main/basket");
  };

  // 바로구매하기 버튼 클릭 시
  const clickBuy = async () => {
    // store에 jwt값이 없으면 비로그인 상태이다.
    //   -> 왜냐하면 jwt key가 쿠키에 저장되어 있지 않으면 비로그인상태인데
    //      쿠키와 store는 항상 동기화되게끔 코딩했기 때문이다.
    // if (!document.cookie.includes("jwt_key_bookstore_one=")) {
    if (!jwt) {
      alert("주문하려면 로그인이 필요합니다.");

      // 로그인 페이지로 이동
      navigate("/login");

      return;
    }

    try {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>  BookList.tsx  166");
      console.log(searchedBookList);

      const copySearchedBookList = JSON.parse(JSON.stringify(searchedBookList));

      // searchedBookList 에서 체크박스 체크된 항목만 가져온다.
      const filteredSearchedBookList = copySearchedBookList.filter(
        (item: Book) => item.isCheck === true
      );

      if (filteredSearchedBookList.length === 0) {
        alert("구매할 도서를 선택하십시오.");
        return;
      }

      filteredSearchedBookList.forEach((item: Book) => {
        // item.userUsername = username;
        Object.assign(item, {
          userUsername: username,
          orderPrice: item.bookPrice,
        });
      });

      const res = await axios.post(
        "http://13.125.112.126:8081/order/doOrderBook",
        // "http://localhost:8081/order/doOrderBook",
        filteredSearchedBookList
      );

      if (res.data !== "success") {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>  BookList.tsx  212");
        return;
      }

      alert("주문이 완료되었습니다.");

      // 주문내역 페이지로 이동
      navigate("/main/order_history");

      return;
    } catch (err) {
      alert("API 호출 중 에러가 발생했습니다.");
      console.log("BookList.jsx > error:", err);
    }
  };

  return (
    <div className="doc-booklist">
      <div className="booklist-content">
        <div className="booklist-header">
          <h1>도서 리스트</h1>
          <div className="booklist-header-right">
            {roles === "ROLE_ADMIN" ? (
              <div className="booklist-header-right-inner">
                <span>
                  <button
                    className="bgBtnW2"
                    onClick={() => {
                      dispatch(setModalOpen(true));
                      dispatch(setIsBookAdd(true));
                    }}
                  >
                    도서추가
                  </button>
                </span>
                <span>
                  <button className="bgBtnW2" onClick={clickDelete}>
                    도서삭제
                  </button>
                </span>
              </div>
            ) : (
              <div className="booklist-header-right-inner"></div>
            )}
            <div className="booklist-header-right-inner">
              <span className="buy">
                <button className="bgBtnW2" onClick={clickBuy}>
                  바로구매
                </button>
              </span>
              <span className="buy">
                <button className="bgBtnW2" onClick={clickBasket}>
                  장바구니담기
                </button>
              </span>
            </div>
          </div>
        </div>
        <div className="searchResultList">
          {searchedBookList.map((item: Book, index: number) => {
            return (
              <div className="result_one" key={item.bookNo}>
                <div className="result_one_thum">
                  <div className="chk">
                    <input
                      type="checkbox"
                      checked={item.isCheck}
                      onChange={(e) => checkHandler(index, e)}
                    />
                  </div>
                  <div className="book_img">
                    <img
                      src={item.bookImage}
                      alt="도서이미지가 없음"
                      className="imgbordersty01"
                    ></img>
                  </div>
                </div>
                <div className="result_one_cont">
                  <dl className="recom">
                    <dl>
                      <dt>{item.bookTitle}</dt>
                    </dl>
                    <dl className="info01">
                      {`${item.bookAuthor} | ${item.bookPublisher} | ${
                        item.bookPubDate.substring(0, 4) +
                        "." +
                        item.bookPubDate.substring(4, 6) +
                        "." +
                        item.bookPubDate.substring(6, 8)
                      } | ${item.bookPageNo + "p"}`}
                    </dl>
                    <dl className="info02">{item.bookDesc}</dl>
                    <dl>{Number(item.bookPrice).toLocaleString() + "원"}</dl>
                  </dl>
                </div>
                <div className="result_one_sellinfo">
                  <ul className="fRspace">
                    <li className="btn01">
                      {roles === "ROLE_ADMIN" ? (
                        <>
                          <button
                            className="bgBtnW"
                            onClick={() => clickUpdate(item)}
                          >
                            도서수정
                          </button>
                        </>
                      ) : (
                        <></>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BookList;

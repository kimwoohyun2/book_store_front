import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { Book } from "../types/global";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { setBasketBookList } from "../store/modules/bookList";

function BasketList() {
  // useSelector
  const { username, jwt } = useSelector((state: RootState) => state.common);

  const { basketBookList } = useSelector((state: RootState) => state.bookList);

  // useNavigate
  const navigate = useNavigate();

  // useDispatch
  const dispatch = useDispatch();

  // useEffect
  useEffect(() => {
    const copyBasketBookList = JSON.parse(JSON.stringify(basketBookList));
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>  BasketList.tsx  24");

    // 장바구니 리스트 화면 시작 시 체크박스 체크여부 초기화 처리.
    copyBasketBookList.forEach((item: Book) => {
      item.isCheck = false;
    });

    dispatch(setBasketBookList(copyBasketBookList));
  }, []);

  // method

  // '장바구니에서 삭제' 버튼 클릭 시
  const clickOneDelete = async (paramItemBookNo: number) => {
    const copyBasketBookList = JSON.parse(JSON.stringify(basketBookList));

    copyBasketBookList.forEach((item: Book, index: number) => {
      if (paramItemBookNo === item.bookNo) {
        copyBasketBookList.splice(index, 1);
      }
    });

    dispatch(setBasketBookList(copyBasketBookList));
  };

  // 체크된 항목만 장바구니 삭제
  const clickSelectedDelete = () => {
    const copyBasketBookList = JSON.parse(JSON.stringify(basketBookList));

    // basketBookList 에서 체크박스 체크된 항목만 가져온다.
    const filteredTrueBasketList = copyBasketBookList.filter(
      (item: Book) => item.isCheck === true
    );

    if (filteredTrueBasketList.length === 0) {
      alert("삭제할 도서를 선택하십시오.");
      return;
    }

    // basketBookList 에서 체크박스 체크 안 된 항목만 가져온다.
    const filteredFalseBasketList = copyBasketBookList.filter(
      (item: Book) => item.isCheck === false
    );

    dispatch(setBasketBookList(filteredFalseBasketList));
  };

  const checkHandler = (paramIndex: number, { target }: any) => {
    const copyBasketBookList = JSON.parse(JSON.stringify(basketBookList));
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>  BasketList.tsx  37");
    console.dir(target.checked);

    // target.checked 값은 before, after 중 after값이다.
    copyBasketBookList[paramIndex].isCheck = target.checked;

    dispatch(setBasketBookList(copyBasketBookList));
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

    const copyBasketBookList = JSON.parse(JSON.stringify(basketBookList));

    // searchedBookList 에서 체크박스 체크된 항목만 가져온다.
    const filteredBasketList = copyBasketBookList.filter(
      (item: Book) => item.isCheck === true
    );

    if (filteredBasketList.length === 0) {
      alert("구매할 도서를 선택하십시오.");
      return;
    }

    filteredBasketList.forEach((item: Book) => {
      // item.userUsername = username;
      Object.assign(item, {
        userUsername: username,
        orderPrice: item.bookPrice,
      });
    });

    let res;
    try {
      res = await axios.post(
        "http://13.125.112.126:8081/order/doOrderBook",
        // "http://localhost:8081/order/doOrderBook",
        filteredBasketList
      );
    } catch (err) {
      alert("API 호출 중 에러가 발생했습니다.");
      console.log("BasketList.jsx > error:", err);
    }

    if (!res || res.data !== "success") {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>  BookList.tsx  106");
      return;
    }

    alert("주문이 완료되었습니다.");

    // 구매하였으니 장바구니리스트에서 삭제처리한다.
    clickSelectedDelete();

    // 주문내역 페이지로 이동
    navigate("/main/order_history");

    return;
  };

  // useMemo  -------------------------------------------------------------------

  return (
    <div className="doc-booklist">
      <div className="booklist-content">
        <div className="booklist-header">
          <h1>장바구니 리스트</h1>
          <div className="booklist-header-right">
            <div className="booklist-header-right-inner"></div>
            <div className="booklist-header-right-inner">
              <span className="buy">
                <button className="bgBtnW2" onClick={clickBuy}>
                  바로구매
                </button>
              </span>
              <span className="buy">
                <button className="bgBtnW2" onClick={clickSelectedDelete}>
                  선택삭제
                </button>
              </span>
            </div>
          </div>
        </div>
        <div className="searchResultList">
          {basketBookList.map((item: Book, index: number) => {
            return (
              <div className="result_one" key={index}>
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
                      <button
                        className="bgBtnW"
                        onClick={() => clickOneDelete(item.bookNo)}
                      >
                        장바구니에서 삭제
                      </button>
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

export default BasketList;

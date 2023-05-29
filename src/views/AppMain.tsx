import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import BookList from "../components/BookList";
import ContainerHeader from "../components/ContainerHeader";
import OrderHistory from "./OrderHistory";
import BasketList from "../components/BasketList";
import {
  setUsername,
  setFullname,
  setJwt,
  setRoles,
} from "../store/modules/common";

function AppMain() {
  // useLocation
  const location = useLocation();

  // useSelector
  const { jwt } = useSelector((state: RootState) => state.common);

  // useDispatch
  const dispatch = useDispatch();

  // useNavigate
  const navigate = useNavigate();

  // useEffect
  useEffect(() => {
    // jwt키가 없으면 비로그인상태이므로 무조건 /main/list 로 간다.
    if (!jwt) {
      navigate("/main/list");
    }
  }, []);

  // etc
  function listener(e: any) {
    // 초기화
    dispatch(setUsername(""));
    dispatch(setFullname(""));
    dispatch(setJwt(""));
    dispatch(setRoles(""));

    e.preventDefault();
    e.returnValue = "";

    // window.removeEventListener("beforeunload", listener);
  }

  window.addEventListener("beforeunload", listener);

  // window.removeEventListener("beforeunload", listener);

  // // 쿠키에 jwt 가 저장되어 있으면
  // if (document.cookie.includes("jwt_key_bookstore_one=")) {
  //   // 쿠키를 split하여 username, fullname, jwt, role 값 가져오는 로직 (start) --------
  //   const strCookie = document.cookie.replaceAll(" ", "");

  //   const arrCookie = strCookie.split(";");

  //   let jwtKey;
  //   let role;
  //   arrCookie.forEach((item: string) => {
  //     if (item.includes("jwt_key_bookstore_one=")) {
  //       jwtKey = item.replaceAll("jwt_key_bookstore_one=", "");
  //     }
  //     if (item.includes("roles_bookstore_one=")) {
  //       role = item.replaceAll("roles_bookstore_one=", "");
  //     }
  //   });

  //   // 쿠키를 split하여 username, fullname, jwt, role 값 가져오는 로직 (end) ---------
  // }

  return (
    <>
      <ContainerHeader />
      {/* jwt키가 없으면 비로그인상태이므로 무조건 BookList 를 렌더링한다. */}
      {/* /main/list : booklist , /main/order_history : order history , /main/basket : basketlist */}
      {jwt && location.pathname === "/main/order_history" ? (
        <OrderHistory />
      ) : jwt && location.pathname === "/main/basket" ? (
        <BasketList />
      ) : (
        <BookList />
      )}
    </>
  );
}

export default AppMain;

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ContainerSearch from "./ContainerSearch";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import ModalPopup from "./ModalPopup";
import { setIsBookAdd } from "../store/modules/bookList";
import {
  setUsername,
  setFullname,
  setJwt,
  setRoles,
  setModalOpen,
} from "../store/modules/common";
import { setSearchData, setSearchedBookList } from "../store/modules/bookList";
import { getBookList } from "../common/function";

function ContainerHeader() {
  // useSelector  --------------------------------------------------------------
  const { jwt, fullname, roles, modalOpen } = useSelector(
    (state: RootState) => state.common
  );

  // useDispatch
  const dispatch = useDispatch();

  // useNavigate
  const navigate = useNavigate();

  // method  -------------------------------------------------------------------
  const clickLogin = () => {
    // 로그인 페이지로 이동
    navigate("/login");
  };

  const clearCookies = (
    wildcardDomain = true,
    primaryDomain = true,
    path = null
  ) => {
    const pathSegment = path ? "; path=" + path : "";
    const expSegment = "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie.split(";").forEach((item) => {
      primaryDomain &&
        (document.cookie = item
          .replace(/^ +/, "")
          .replace(/=.*/, expSegment + pathSegment));
      wildcardDomain &&
        (document.cookie = item
          .replace(/^ +/, "")
          .replace(
            /=.*/,
            expSegment + pathSegment + "; domain=" + document.domain
          ));
    });
  };

  const clickLogo = async () => {
    dispatch(setSearchData(""));
    try {
      const resData = await getBookList("");

      if (!resData) {
        return;
      }

      // 스토어에 넣는다.
      dispatch(setSearchedBookList(resData));

      return resData;
    } catch (err) {
      console.log("ContainerSearch.vue > error:", err);
    }
  };

  const clickLogout = () => {
    // 쿠키 모두 삭제
    clearCookies();

    // 초기화
    dispatch(setUsername(""));
    dispatch(setFullname(""));
    dispatch(setJwt(""));
    dispatch(setRoles(""));

    // 메인 페이지로 이동
    navigate("/main/list");
  };

  return (
    <header
      className={modalOpen ? "doc-header modal-background" : "doc-header"}
    >
      <div className="main_tit">
        <div className="inner_main">
          <h1 className="doc-title">
            <Link to="/main/list" onClick={clickLogo}>
              BookStore
            </Link>
          </h1>
        </div>
        {modalOpen ? <></> : <ContainerSearch />}

        <div className="doc-header-right">
          <div className="header-right-inner">
            {jwt ? (
              <span>
                <button
                  onClick={() => {
                    navigate("/main/basket");
                  }}
                >
                  장바구니
                </button>
              </span>
            ) : (
              <span></span>
            )}
            {jwt ? (
              <span>
                <button
                  onClick={() => {
                    navigate("/main/order_history");
                  }}
                >
                  주문내역
                </button>
              </span>
            ) : (
              <span></span>
            )}
            {jwt ? (
              <span className="header-loginout">
                <button onClick={clickLogout}>
                  로그아웃
                  <br /> ({fullname}님)
                </button>
              </span>
            ) : (
              <span className="header-loginout">
                <button onClick={clickLogin}>로그인</button>
              </span>
            )}
          </div>
        </div>
      </div>
      {modalOpen && <ModalPopup setModalOpen={setModalOpen} />}
    </header>
  );
}

export default ContainerHeader;

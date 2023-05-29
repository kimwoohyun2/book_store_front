import { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { setSearchData, setSearchedBookList } from "../store/modules/bookList";
import type { Book } from "../types/global";
import { getBookList } from "../common/function";

function ContainerSearch() {
  // useSelector
  const { searchData } = useSelector((state: RootState) => state.bookList);

  // useDispatch
  const dispatch = useDispatch();

  // useNavigate
  const navigate = useNavigate();

  // useLocation
  const location = useLocation();

  // method
  const inputKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchData(e.target.value));
  };

  // 상단 검색창에서 엔터키를 쳤을 때
  const onAnyKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await getBooksAndStore();
    }
  };

  // 상단 검색창의 검색버튼(돋보기) 클릭 시
  const clickSearch = async () => {
    await getBooksAndStore();
  };

  // bookList 조회해오는 메서드
  const getBooksAndStore = async () => {
    try {
      // const res = await axios.get(
      //   "http://13.125.112.126:8081/book/getBookList",
      //   {
      //     params: { searchWord: searchData },
      //   }
      // );

      // if (!res || !res.data || res.status !== 200 || !res.data.bookList) {
      //   return;
      // }

      const resData = await getBookList(searchData);

      if (!resData) {
        return;
      }

      // res.data.bookList.forEach((item: Book) => {
      //   // 체크박스 체크여부를 false로 초기화
      //   item.isCheck = false;
      // });

      // // 스토어에 넣는다.
      // dispatch(setSearchedBookList(res.data.bookList));

      // 스토어에 넣는다.
      dispatch(setSearchedBookList(resData));

      if (location.pathname !== "/main/list") {
        navigate("/main/list");
      }

      // return res.data;
      return resData;
    } catch (err) {
      console.log("ContainerSearch.vue > error:", err);
    }
  };

  useEffect(() => {
    getBooksAndStore();
  }, []);

  return (
    <div className="container-search">
      <div className="sub_tit">
        <div className="wrap_search">
          <div className="bundle_inp">
            <input
              type="text"
              value={searchData}
              onChange={inputKey}
              onKeyDown={onAnyKeyPress}
            />
            <button type="button" onClick={clickSearch}>
              <span className="ir_pm">검색</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContainerSearch;

import axios from "axios";
import type { Book } from "../types/global";

export async function getBookList(paramSearchData: string) {
  let res;
  try {
    res = await axios.get("http://13.125.112.126:8081/book/getBookList", {
      params: { searchWord: paramSearchData },
    });

    if (!res || !res.data || res.status !== 200 || !res.data.bookList) {
      return;
    }

    res.data.bookList.forEach((item: Book) => {
      // 체크박스 체크여부를 false로 초기화
      item.isCheck = false;
    });

    return res.data.bookList;
  } catch (err) {
    console.log("getBookList api error:", err);
    return;
  }
}

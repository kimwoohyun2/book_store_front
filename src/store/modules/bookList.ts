// store/modules/bookList.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Book, BookListStore } from "../../types/global";

// 초기 상태
const initialState: BookListStore = {
  // 상단 검색창의 검색어
  searchData: "",
  // 전체 혹은 검색된 book list
  searchedBookList: [],
  // 추가 혹은 수정할 book을 담는 객체
  bookOne: {
    /** 도서 NO */
    bookNo: 0,
    /** 도서 제목 */
    bookTitle: "",
    /** 도서 설명 */
    bookDesc: "",
    /** 도서 이미지주소 */
    bookImage: "",
    /** 도서 저자 */
    bookAuthor: "",
    /** 도서 출판사 */
    bookPublisher: "",
    /** 도서 출판일 */
    bookPubDate: "",
    /** 도서 페이지수 */
    bookPageNo: "",
    /** 도서 가격 */
    bookPrice: "",
    /** 등록일시 */
    regiDate: "",
    /** 최종수정일시 */
    lastDate: "",
    /** 체크박스 체크여부 */
    isCheck: false,
  },
  isBookAdd: true,
  // 장바구니 book 리스트
  basketBookList: [],
};

// 리듀서 슬라이스
const bookListSlice = createSlice({
  name: "bookList",
  initialState,
  reducers: {
    setSearchData(state: BookListStore, action: PayloadAction<string>) {
      state.searchData = action.payload;
    },
    setSearchedBookList(state: BookListStore, action: PayloadAction<Book[]>) {
      state.searchedBookList = action.payload;
    },
    setBookOne(state: BookListStore, action: PayloadAction<Book>) {
      state.bookOne = action.payload;
    },
    setIsBookAdd(state: BookListStore, action: PayloadAction<boolean>) {
      state.isBookAdd = action.payload;
    },
    setBasketBookList(state: BookListStore, action: PayloadAction<Book[]>) {
      state.basketBookList = action.payload;
    },
  },
});

// 리듀서 & 액션 리턴
export const {
  setSearchData,
  setSearchedBookList,
  setBookOne,
  setIsBookAdd,
  setBasketBookList,
} = bookListSlice.actions;
export default bookListSlice.reducer;

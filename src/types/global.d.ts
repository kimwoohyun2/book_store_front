/***********************************************************************************
 * 파일: global.d.ts
 * 설명:
 ***********************************************************************************/

/** book 타입 */
export interface Book {
  /** 도서 NO */
  bookNo: number;
  /** 도서 제목 */
  bookTitle: string;
  /** 도서 설명 */
  bookDesc: string;
  /** 도서 이미지주소 */
  bookImage: string;
  /** 도서 저자 */
  bookAuthor: string;
  /** 도서 출판사 */
  bookPublisher: string;
  /** 도서 출판일 */
  bookPubDate: string;
  /** 도서 페이지수 */
  bookPageNo: string;
  /** 도서 가격 */
  bookPrice: string;
  /** 등록일시 */
  regiDate: string;
  /** 최종수정일시 */
  lastDate: string;
  /** 체크박스 체크여부 */
  isCheck: boolean;
  /** 회원 이메일주소 */
  userUsername?: string;
  /** 주문 가격 */
  orderPrice?: string;
}

/** OrderHistory (주문내역) */
export interface OrderHistoryType {
  /** 주문 NO */
  orderNo: number;
  /** 주문상세 NO */
  orderDetailNo: number;
  /** 회원 이메일주소 */
  userUsername: string;
  /** 도서 NO */
  bookNo: number;
  /** 도서 이름 */
  bookTitle: number;
  /** 주문 가격 */
  orderPrice: number;
  /** 주문 일시 */
  orderDate: string;
}

/** api response data */
export interface ResData {
  bookList: Book[];
}

/** api response data */
export interface BookListStore {
  searchData: string;
  searchedBookList: Book[];
  bookOne: Book;
  /**  true: book 추가, false: book 수정 */
  isBookAdd: boolean;
  basketBookList: Book[];
}

export interface CommonStore {
  /** 이메일주소 */
  username: string;
  /** 이름 */
  fullname: string;
  /** jwt키 */
  jwt: string;
  /** 권한이 담긴 string */
  roles: string;
  // 모달팝업 오픈 여부
  modalOpen: boolean;
}

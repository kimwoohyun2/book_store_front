// store/modules/common.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CommonStore } from "../../types/global";

// 초기 상태
const initialState: CommonStore = {
  // 이메일주소
  username: "",
  // 이름
  fullname: "",
  // jwt키
  jwt: "",
  // 권한이 담긴 string
  roles: "",
  // 모달팝업 오픈 여부
  modalOpen: false,
};

// 리듀서 슬라이스
const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setUsername(state: CommonStore, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setFullname(state: CommonStore, action: PayloadAction<string>) {
      state.fullname = action.payload;
    },
    setJwt(state: CommonStore, action: PayloadAction<string>) {
      state.jwt = action.payload;
    },
    setRoles(state: CommonStore, action: PayloadAction<string>) {
      state.roles = action.payload;
    },
    setModalOpen(state: CommonStore, action: PayloadAction<boolean>) {
      state.modalOpen = action.payload;
    },
  },
});

// 리듀서 & 액션 리턴
export const { setUsername, setFullname, setJwt, setRoles, setModalOpen } =
  commonSlice.actions;
export default commonSlice.reducer;

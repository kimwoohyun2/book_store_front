// store/modules/index.ts

import { combineReducers } from "redux";
import common from "./common";
import bookList from "./bookList";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["common", "bookList"],
};

// 루트 리듀서
const rootReducer = combineReducers({ common, bookList });

export default persistReducer(persistConfig, rootReducer);

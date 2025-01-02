import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import userSlice from "./slice/userSlice";
import questionSlice from "./slice/examSlice";

export const persistConfig = {
  key: "demo",
  version: 1,
  storage,
};
const combinedReducer = combineReducers({
  user: userSlice,
  exam: questionSlice,
});

const rootReducer = (state, action) => {
  return combinedReducer(state, action);
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

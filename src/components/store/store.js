import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./auth";
import expensereducer from "./exp"

export const store = configureStore({
  reducer: { auth: authreducer, expense: expensereducer },
});

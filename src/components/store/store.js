import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./auth";
import expensereducer from "./exp";
import themereducer from "./theme";

export const store = configureStore({
  reducer: { auth: authreducer, expense: expensereducer, theme: themereducer },
});

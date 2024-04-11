import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./productItems";
import cartReducer from "./cartItems"

const store = configureStore({
  reducer: { product: productReducer,cart: cartReducer },
});

export default store;
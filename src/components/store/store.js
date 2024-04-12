import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./productItems";
import cartReducer from "./cartItems";
import uiReducer from "./ui-slice";

const store = configureStore({
  reducer: { product: productReducer, cart: cartReducer, ui: uiReducer },
});

export default store;

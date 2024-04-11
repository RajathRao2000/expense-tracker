import { createSlice } from "@reduxjs/toolkit";

const initialProductState = { list: [{title:"test",price: 56,description: "test description"}] };

const productSlice = createSlice({
  name: "cart",
  initialState: initialProductState,
  reducers: {
    addItem() {},
    removeItem() {},
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;

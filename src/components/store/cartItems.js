import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { showcart:false,list: [] };

const cartSlice = createSlice({
  name: "cartlist",
  initialState: initialCartState,
  reducers: {
    addToCart(state, action) {
      let flag = false;
      for (let i = 0; i < state.list.length; i++) {
        if (state.list[i].name == action.payload.name) {
          state.list[i].quantity++;
          flag = true;
          break;
        }
      }
      if (!flag) {
        state.list.push({...action.payload,quantity:1});
      }
    },
    editQuantity(state,action){
        for (let i = 0; i < state.list.length; i++) {
            if (state.list[i].name === action.payload.props.name) {
              state.list[i].quantity+=action.payload.quantity;
              if(state.list[i].quantity===0){
                state.list=state.list.filter((item)=>{
                    return state.list[i].name !== action.payload.props.name
                })
              }
              break;
            }
          }

    },
    showcart(state){
        state.showcart=!state.showcart
    }
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;

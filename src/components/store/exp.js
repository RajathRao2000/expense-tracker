import { createSlice } from "@reduxjs/toolkit";


const initialState = { list:  [] };

const expenseSlice = createSlice({
  name: "expenselist",
  initialState,
  reducers: {
    editExpense(state, action) {},
    addExpense(state, action) {
      state.list.push(action.payload)
    },
    setExpenses(state,action) {
      state.list=action.payload 
    },
    deleteExpense(state, action) {
      state.list=state.list.filter((expense) => {
        console.log(expense,expense.expenseid,action.payload)
        return expense.expenseid !== action.payload;
      });
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;

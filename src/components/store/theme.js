import { createSlice } from "@reduxjs/toolkit";

const initialState={dark: false, premium: false}

const themeSlice=createSlice({
    name: "theme",
    initialState,
    reducers:{
        toggle(state){
            state.dark=!state.dark
            state.premium=true
        }
    }
})

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;
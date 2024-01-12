import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCart: false,
  notification: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showCart(state) {
      state.showCart = !state.showCart;
    },
    notification(state, action) {},
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;

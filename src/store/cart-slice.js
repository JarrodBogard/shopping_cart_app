import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart: (state, action) => {
      state.totalQuantity = action.payload.totalQuantity || 0;
      state.totalAmount = action.payload.totalAmount || 0;
      state.items = action.payload.items || [];
    },
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      state.totalAmount += newItem.price;
      state.totalQuantity++;
      state.changed = true;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          description: newItem.description,
          releaseYear: newItem.releaseYear,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
      }
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      state.totalAmount -= existingItem.price;
      state.totalQuantity--;
      state.changed = true;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== existingItem.id);
      } else {
        existingItem.totalPrice -= existingItem.price;
        existingItem.quantity--;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;

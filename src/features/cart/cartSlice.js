import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // {product, quantity}
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existing = state.items.find(i => i.product.id === item.product.id);

      if (existing) {
        existing.quantity++;
      } else {
        state.items.push({ product: item.product, quantity: 1 });
      }
    },

    increaseItem(state, action) {
      const find = state.items.find(i => i.product.id === action.payload);
      if (find) find.quantity++;
    },

    decreaseItem(state, action) {
      const find = state.items.find(i => i.product.id === action.payload);
      if (find && find.quantity > 1) find.quantity--;
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(i => i.product.id !== action.payload);
    },

    clearCart(state) {
      state.items = [];
    }
  },
});

export const { addToCart, increaseItem, decreaseItem, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

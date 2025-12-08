import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/apiClient";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async () => {
    const { data } = await api.get("/products");
    return data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => { state.loading = false });
  },
});

export default productSlice.reducer;

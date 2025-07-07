import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../../lib/types";

interface ProductState {
  item: Product;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  item: {} as Product,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchProductStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductSuccess(state, action: PayloadAction<Product>) {
      state.item = action.payload;
      state.loading = false;
    },
    fetchProductFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchProductStart,
  fetchProductSuccess,
  fetchProductFailure,
} = productSlice.actions;

export default productSlice.reducer;
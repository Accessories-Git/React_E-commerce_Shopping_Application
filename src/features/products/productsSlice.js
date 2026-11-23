import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getJSON } from "../../api/fakeStore";

// The "condition" option stops a second request from starting while one is running.
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  () => getJSON("/products", "Failed to fetch products. Please try again."),
  { condition: (_, { getState }) => getState().products.status !== "loading" }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  () => getJSON("/products/categories", "Failed to fetch categories."),
  { condition: (_, { getState }) => getState().products.categoriesStatus !== "loading" }
);

const initialState = {
  items: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
  categories: [],
  categoriesStatus: "idle",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesStatus = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesStatus = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categoriesStatus = "failed";
      });
  },
});

export default productsSlice.reducer;

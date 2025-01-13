import { axiosInstance } from '@/lib/axios';
import { Product } from '@/types/product-type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

interface ProductState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get('/products');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.message) {
      return thunkAPI.rejectWithValue(error.message);
    } else {
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload as string;
        } else {
          state.error = 'An unknown error occurred';
        }
      });
  },
});

export const selectAllProducts = (state: RootState) => state.product.products;
export const selectProductById = (state: RootState, productId: string) =>
  state.product.products.find((product) => product.id === productId);

export const selectProductStatus = (state: RootState) => state.product.status;
export const selectProductError = (state: RootState) => state.product.error;

export default productSlice.reducer;

import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import axios from 'axios';
import { axiosInstance } from '@/lib/axios';

interface Cart {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
}

interface CartState {
  carts: Cart[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CartState = {
  carts: [],
  status: 'idle',
  error: null,
};

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get('/cart');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.message) {
      return thunkAPI.rejectWithValue(error.message);
    } else {
      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  }
});

export const fetchCartByUserId = createAsyncThunk(
  'cart/fetchCartByUserId',
  async (userId: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/cart/', {
        params: {
          userId,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.message) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue('An unknown error occurred');
      }
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart: (state) => {
      state.carts = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCartByUserId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartByUserId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.carts = action.payload;
      })
      .addCase(fetchCartByUserId.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload as string;
        } else {
          state.error = 'An unknown error occurred';
        }
      })
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.carts = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload as string;
        } else {
          state.error = 'An unknown error occurred';
        }
      });
  },
});

export const selectCartState = (state: RootState) => state.cart;

export const selectCartByUserId = createSelector(
  [selectCartState, (_state: RootState, userId: string) => userId],
  (cart, userId) => {
    const filteredCarts = cart.carts.filter((item) => item.userId === userId);
    return filteredCarts;
  }
);

export const selectAllCart = (state: RootState) => state.cart.carts;

export const { resetCart } = cartSlice.actions;

export default cartSlice.reducer;

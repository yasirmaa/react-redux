import { axiosInstance } from '@/lib/axios';
import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

const initialState: User = {
  id: '',
  username: '',
  email: '',
  role: '',
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (
    {
      username,
      email,
      password,
    }: {
      username: string;
      email: string;
      password: string;
    },
    thunkAPI
  ) => {
    try {
      const usernameExists = await axiosInstance.get('users', {
        params: { username },
      });

      const emailExists = await axiosInstance.get('users', {
        params: { email },
      });

      if (usernameExists.data.length > 0) {
        return thunkAPI.rejectWithValue('Username already exists');
      }

      if (emailExists.data.length > 0) {
        return thunkAPI.rejectWithValue('Email already exists');
      }
      const response = await axiosInstance.post('users', {
        id: nanoid(),
        username,
        email,
        password,
        role: 'user',
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue({
          message: error.message,
          status: error.response?.status,
        });
      } else {
        return thunkAPI.rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.get('users', {
        params: {
          email: data.email,
          password: data.password,
        },
      });
      if (response.data.length === 0) {
        return thunkAPI.rejectWithValue('Invalid email or password');
      }
      window.localStorage.setItem('user-token', response.data[0].id);
      return response.data[0];
    } catch (error) {
      if (axios.isAxiosError(error) && error.message) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue('An unknown error occurred');
      }
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.id = '';
      state.username = '';
      state.email = '';
      state.role = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.role = action.payload.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.error('Login failed:', action.payload);
      });
  },
});

export const selectUser = (state: { user: User }) => state.user;
export const { logout } = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.id = '';
      state.username = '';
      state.email = '';
      state.role = '';
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;

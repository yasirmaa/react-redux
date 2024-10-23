import { combineReducers } from 'redux';
import { userReducer } from './user';

export const reducers = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof reducers>;

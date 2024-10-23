const DEFAULT_USER = {
  id: '',
  email: '',
};

interface UserPayload {
  id: string;
  email: string;
}

interface UserAction {
  type: string;
  payload: UserPayload;
}

export const userReducer = (state = DEFAULT_USER, action: UserAction) => {
  if (action.type === 'USER_LOGIN') {
    const dupState = { ...state };

    dupState.id = action.payload.id;
    dupState.email = action.payload.email;

    return dupState;
  } else if (action.type === 'USER_LOGOUT') {
    return DEFAULT_USER;
  }
  return state;
};

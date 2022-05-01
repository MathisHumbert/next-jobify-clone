import { LOGIN_CLIENT, LOGOUT_CLIENT } from '../actions/user';

export const defaultClient = {
  id: false,
};

export default function clientReducer(state = defaultClient, action) {
  switch (action.type) {
    case LOGOUT_CLIENT:
      return defaultClient;
    case LOGIN_CLIENT:
      return { ...state, ...action.client };
    default:
      return state;
  }
}

export function isClientLoggedIn(state) {
  let token = false;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }
  return !!token || !!state.id;
}

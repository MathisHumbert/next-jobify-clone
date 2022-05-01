export const LOGIN_CLIENT = 'LOGIN_CLIENT';
export const LOGOUT_CLIENT = 'LOGOUT_CLIENT';

export function loginClient(client) {
  localStorage.setItem('token', client.token);
  return (dispatch) => {
    dispatch({
      type: LOGIN_CLIENT,
      client,
    });
  };
}

export function logoutClient() {
  localStorage.removeItem('token');
  return (dispatch) => {
    dispatch({
      type: LOGOUT_CLIENT,
    });
  };
}

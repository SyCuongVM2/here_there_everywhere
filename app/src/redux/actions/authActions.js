import client from '../../utils/client';

import { 
  USER_LOADED, AUTH_ERROR, REGISTER_SUCCESS, REGISTER_FAIL,
  LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT
} from './types';

import { getData, storeData, removeData } from '../../utils/storage';
import setAuthToken from '../../utils/setAuthToken';

// me
export const loadUser = () => async dispatch => {
  const token = await getData('token');
  if (token) {
    setAuthToken(token);
  }

  try {
    const res = await client.get('/user/me');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
}

// Register User
export const register = (userData) => async dispatch => {
  try {
    const res = await client.post('/user/register', userData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    await storeData('token', res.data.token);

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login - Get User Token
export const login = (userData) => async dispatch => {
  try {
    const res = await client.post('/user/login', userData);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    await storeData('token', res.data.token);

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Log user out
export const logout = () => async dispatch => {
  await removeData('token');

  dispatch({ type: LOGOUT });
};
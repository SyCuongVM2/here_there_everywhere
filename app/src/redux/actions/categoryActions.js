import client from '../../utils/client';

import {
  CATEGORY_LOADING,
  GET_CATEGORIES,
  GET_CATEGORY,
  GET_SUB_CATEGORIES
} from './types';

export const getCategories = () => async dispatch => {
  dispatch(setCategoryLoading());

  try {
    const res = await client.get('/categories');

    dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_CATEGORIES,
      payload: null
    });
  }
};

export const getCategory = (id) => async dispatch => {
  dispatch(setCategoryLoading());

  try {
    const res = await client.get(`/categories/${id}`);

    dispatch({
      type: GET_CATEGORY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_CATEGORY,
      payload: null
    });
  }
};

export const getSubCategories = (id) => async dispatch => {
  dispatch(setCategoryLoading());

  try {
    const res = await client.get(`/sub/categories/${id}`);

    dispatch({
      type: GET_SUB_CATEGORIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_SUB_CATEGORIES,
      payload: null
    });
  }
};

export const setCategoryLoading = () => {
  return {
    type: CATEGORY_LOADING
  };
};
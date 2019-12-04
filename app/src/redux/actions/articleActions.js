import client from '../../utils/client';

import {
  ARTICLE_LOADING,
  GET_ARTICLES,
  GET_ARTICLE
} from './types';

export const getArticle = (id) => async dispatch => {
  dispatch(setArticleLoading());

  try {
    const res = await client.get(`/articles/${id}`);

    dispatch({
      type: GET_ARTICLE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ARTICLE,
      payload: null
    });
  }
};

export const getArticles = (page) => async dispatch => {
  dispatch(setArticleLoading());
  
  try {
    const res = await client.get(`/articles/page/${page}`);
    
    dispatch({
      type: GET_ARTICLES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ARTICLES,
      payload: null
    });
  }
};

export const getArticlesByCategory = (category, page) => async dispatch => {
  dispatch(setArticleLoading());

  try {
    const res = await client.get(`/articles/${category}/page/${page}`);

    dispatch({
      type: GET_ARTICLES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ARTICLES,
      payload: null
    });
  }
};

export const likeArticle = id => async dispatch => {
  try {
    await client.post(`/articles/likes/${id}`);

    dispatch(getArticles());
  } catch (err) {
    console.log(err.message);
  }
};

export const unlikeArticle = id => async dispatch => {
  try {
    await client.post(`/articles/unlikes/${id}`);

    dispatch(getPosts());
  } catch (err) {
    console.log(err.message);
  }
};

export const setArticleLoading = () => {
  return {
    type: ARTICLE_LOADING
  };
};
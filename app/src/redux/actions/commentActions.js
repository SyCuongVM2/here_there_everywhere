import client from '../../utils/client';

import {
  COMMENTS_LOADING,
  GET_COMMENTS,
  GET_COMMENT,
  GET_TOTAL
} from './types';

export const getTotalComments = (article_id) => async dispatch => {
  try {
    const res = await client.get(`/comments/total/${article_id}`);
    dispatch({
      type: GET_TOTAL,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const getComment = (comment_id) => async dispatch => {
  try {
    const res = await client.get(`/comments/comment/${comment_id}`);

    dispatch({
      type: GET_COMMENT,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};
export const getReply = (comment_id, reply_id) => async dispatch => {
  try {
    const res = await client.get(`/comments/comment/${comment_id}/reply/${reply_id}`);

    dispatch({
      type: GET_COMMENT,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const addComment = (article_id, commentData) => async dispatch => {
  try {
    const res = await client.post(`/comments/${article_id}`, commentData);

    dispatch({
      type: GET_COMMENT,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};
export const getComments = (article_id, type) => async dispatch => {
  dispatch(setCommentsLoading());

  try {
    const res = await client.get(`/comments/all/${article_id}/${type}`);
    dispatch({
      type: GET_COMMENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_COMMENTS,
      payload: null
    });
  }
};

export const likeComment = (article_id, comment_id) => async dispatch => {
  try {
    await client.post(`/comments/likes/${comment_id}`);

    dispatch(getComments(article_id));
  } catch (err) {
    console.log(err);
  }
};
export const unlikeComment = (article_id, comment_id) => async dispatch => {
  try {
    await client.post(`/comments/unlikes/${comment_id}`);

    dispatch(getComments(article_id));
  } catch (err) {
    console.log(err);
  }
};

export const addReply = (article_id, comment_id, replyData) => async dispatch => {
  try {
    await client.post(`/comments/replies/${comment_id}`, replyData);

    dispatch(getComments(article_id));
  } catch (err) {
    console.log(err);
  }
};
export const removeReply = (article_id, comment_id, reply_id) => async dispatch => {
  try {
    await client.delete(`/comments/${comment_id}/replies/${reply_id}`);

    dispatch(getComments(article_id));
  } catch (err) {
    console.log(err);
  }
};

export const likeReply = (article_id, comment_id, reply_id) => async dispatch => {
  try {
    await client.post(`/comments/${comment_id}/replies/likes/${reply_id}`);

    dispatch(getComments(article_id));
  } catch (err) {
    console.log(err);
  }
};
export const unlikeReply = (article_id, comment_id, reply_id) => async dispatch => {
  try {
    await client.post(`/comments/${comment_id}/replies/unlikes/${reply_id}`);

    dispatch(getComments(article_id));
  } catch (err) {
    console.log(err);
  }
};

export const setCommentsLoading = () => {
  return {
    type: COMMENTS_LOADING
  };
};
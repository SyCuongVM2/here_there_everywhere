import {
  ARTICLE_LOADING,
  GET_ARTICLES,
  GET_ARTICLE
} from '../actions/types';

const initialState = {
  articles: [],
  article: {},
  total_records: 0,
  total_pages: 1,
  article_loading: false
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case ARTICLE_LOADING:
      return {
        ...state,
        article_loading: true
      };
    case GET_ARTICLES:
      return {
        ...state,
        articles: payload.docs,
        total_records: payload.total,
        total_pages: payload.pages,
        article_loading: false
      };
    case GET_ARTICLE:
      return {
        ...state,
        article: payload,
        article_loading: false
      };
    default:
      return state;
  }
};
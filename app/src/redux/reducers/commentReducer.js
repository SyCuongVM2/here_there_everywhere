import {
  COMMENTS_LOADING,
  GET_COMMENTS,
  GET_COMMENT,
  GET_TOTAL
} from '../actions/types';

const initialState = {
  comments: [],
  comment: {},
  countComments: null,
  comments_loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COMMENTS_LOADING:
      return {
        ...state,
        comments_loading: true
      };
    case GET_TOTAL: 
      return {
        ...state,
        countComments: action.payload
      };
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        comments_loading: false
      };
    case GET_COMMENT:
      return {
        ...state,
        comment: action.payload,
        comments_loading: false
      };
    default:
      return state;
  }
};
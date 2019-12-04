import {
  CATEGORY_LOADING,
  GET_CATEGORIES,
  GET_CATEGORY,
  GET_SUB_CATEGORIES
} from '../actions/types';

const initialState = {
  categories: [],
  category: {},
  sub_categories: [],
  category_loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CATEGORY_LOADING:
      return {
        ...state,
        category_loading: true
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        category_loading: false
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
        category_loading: false
      };
    case GET_SUB_CATEGORIES:
      return {
        ...state,
        sub_categories: action.payload,
        category_loading: false
      };
    default:
      return state;
  }
};
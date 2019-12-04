import { combineReducers } from 'redux';

import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import articleReducer from './articleReducer';
import commentReducer from './commentReducer';

export default combineReducers({
  auth: authReducer,
  categories: categoryReducer,
  articles: articleReducer,
  comments: commentReducer
});
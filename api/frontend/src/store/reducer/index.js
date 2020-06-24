import { combineReducers } from 'redux';
import auth from './auth';
import youtube from './youtube';
import blog from './blog';
import Calender from './Calender';
import error from './error';
import message from './message';
import quiz from './quiz';

export default combineReducers({
  auth,
  youtube,
  blog,
  Calender,
  error,
  message,
  quiz,
});
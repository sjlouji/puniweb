import axios from 'axios';
import {
  YDATALOADING,
  YDATALOADED,
  YDATASEARCH,
} from './types';



export const loadYData = () => (dispatch, getState) => {
  dispatch({ type: YDATALOADING });
  axios
    .get('http://192.168.43.88:8000/youtube/api')
    .then((res) => {
      dispatch({
        type: YDATALOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err)
    }); 
};

export const searchData = (query) => (dispatch, getState) => {
  dispatch({ type: YDATASEARCH });
  axios
    .get(`http://192.168.43.88:8000/youtube/api/find?search=${query}`)
    .then((res) => {
      dispatch({
        type: YDATASEARCH,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err)
    }); 
};


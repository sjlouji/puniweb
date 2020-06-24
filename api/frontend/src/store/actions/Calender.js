import axios from 'axios';
import {
    CALENDERLOADED,
    CALENDERLOADING
} from './types';



export const loadCalenderData = () => (dispatch, getState) => {
  dispatch({ type: CALENDERLOADING });
  axios
    .get('http://192.168.43.88:8000/calender/api')
    .then((res) => {
      dispatch({
        type: CALENDERLOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err)
    }); 
};



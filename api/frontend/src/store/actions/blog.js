import axios from 'axios';
import {
  BLOGLOADED,
  BLOGLOADING,
  BLOGSEARCH,
} from './types';



export const loadBlog = () => (dispatch, getState) => {
  dispatch({ type: BLOGLOADING });
  axios
    .get('http://192.168.43.88:8000/blog/api')
    .then((res) => {
      dispatch({
        type: BLOGLOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err)
    }); 
};

// export const searchData = (query) => (dispatch, getState) => {
//   dispatch({ type: YDATASEARCH });
//   axios
//     .get(`http://192.168.43.88:8000/youtube/api/find?search=${query}`)
//     .then((res) => {
//       dispatch({
//         type: YDATASEARCH,
//         payload: res.data,
//       });
//     })
//     .catch((err) => {
//       console.log(err)
//     }); 
// };


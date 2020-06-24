import axios from 'axios';
import {
  QUIZLOADING,
  QUIZLOADED,
  QUIZANSWERUPDATEUSER,
  QUIZUSERDATALOADED,
  QUIZUSERDATALOADING,
} from './types';



export const loadQuiz = () => (dispatch, getState) => {
  dispatch({ type: QUIZLOADING });
  axios
    .get('http://192.168.43.88:8000/quiz/api')
    .then((res) => {
      dispatch({
        type: QUIZLOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err)
    }); 
};

export const addQuizData = ({ obtained_mark,quiz_id, user,attempt,passStatus, percentage}) => (dispatch,getState) => {
  const config = {
    headers: {
      Authorization: tokenConfig(getState),
    },
  };
  console.log(tokenConfig(getState))
  const body = JSON.stringify({ obtained_mark,quiz_id, user ,attempt,passStatus, percentage});
  console.log(body)
  axios
    .post('http://192.168.43.88:8000/quiz/api/quizdata', body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: QUIZANSWERUPDATEUSER,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response)
    });
};

export const viewUserQuizData = () => (dispatch, getState) => {
  dispatch({ type: QUIZUSERDATALOADING });
  axios
    .get('http://192.168.43.88:8000/quiz/api/viewquizdata')
    .then((res) => {
      dispatch({
        type: QUIZUSERDATALOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err)
    }); 
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};
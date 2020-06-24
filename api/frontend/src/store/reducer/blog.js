import {
    BLOGLOADED,
    BLOGSEARCH,
  } from '../actions/types';
  
  const initialState = {
    isLoading: true,
  };

  export default function (state = initialState, action) {
    switch (action.type) {
      case BLOGLOADED:
        console.log(action.payload)
        return {
          ...state,
          isLoading: false,
          bdata: action.payload,
        };
      default:
        return state;
    }
  }
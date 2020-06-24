import {
    CALENDERLOADED,
    CALENDERLOADING,
  } from '../actions/types';
  
  const initialState = {
    isLoading: false,
  };

  export default function (state = initialState, action) {
    switch (action.type) {
      case CALENDERLOADED:
        console.log(action.payload)
        return {
          ...state,
          isLoading: false,
          cdata: action.payload,
        };
      default:
        return state;
    }
  }
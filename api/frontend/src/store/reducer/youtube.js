import {
    YDATALOADED,
    YDATASEARCH,
  } from '../actions/types';
  
  const initialState = {
    isLoading: true,
  };

  export default function (state = initialState, action) {
    switch (action.type) {
      case YDATALOADED:
        return {
          ...state,
          isLoading: false,
          ydata: action.payload,
        };
        case YDATASEARCH:
          return{
            ...state,
            ysearchdata: action.payload,
          }
      default:
        return state;
    }
  }
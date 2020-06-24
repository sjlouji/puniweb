import {
    PAYMENTDONE,
    PAYMENTLOADING
  } from '../actions/types';
  
  const initialState = {
    isLoading: false,
  };

  export default function (state = initialState, action) {
    switch (action.type) {
      case PAYMENTDONE:
        return {
          ...state,
          ...action.payload,
          isLoading: false,
        };
      default:
        return state;
    }
  }
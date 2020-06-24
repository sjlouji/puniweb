import {
    QUIZLOADED,
    QUIZLOADING,
    QUIZUSERDATALOADED,
    QUIZANSWERUPDATEUSER,
  } from '../actions/types';
  
  const initialState = {
    isLoading: true,
    isUserDataAdded: false,
  };

  export default function (state = initialState, action) {
    switch (action.type) {
      case QUIZLOADED:
        console.log(action.payload)
        return {
          ...state,
          isLoading: false,
          bdata: action.payload,
        };
        case QUIZANSWERUPDATEUSER:
          return {
            ...state,
            ...action.payload,
            isUserDataAdded: true,
            isLoading: false,
          };
          case QUIZUSERDATALOADED:
            return {
              ...state,
              isLoading: false,
              userQuizdata: action.payload,
            };
      default:
        return state;
    }
  }
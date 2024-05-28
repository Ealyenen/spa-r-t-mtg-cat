import { SET_LANGUAGE } from './actions';


interface LanguageAction {
    type: string;
    payload: string;
  }
  

const initialState = {
  language: 'en',
};

const languageReducer = (state = initialState, action: LanguageAction) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};

export default languageReducer;

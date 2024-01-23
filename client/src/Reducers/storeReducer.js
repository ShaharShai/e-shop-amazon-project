import { SIGN_IN, SIGN_OUT } from "../actions";

const storeReducer = (state, action) => {
    switch (action.type) {
      case SIGN_IN: 
        return { ...state, userInfo: action.payload };
      case SIGN_OUT:
        return { ...state, userInfo: null };
      default:
        return state;
    }
  };
  
  export default storeReducer;
  
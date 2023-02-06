import {
  INIT_FORGOTPASSWORD,
  FAILURE_FORGOTPASSWORD,
  SET_FORGOTPASSWORD_DATA,
  RESET_FORGOTPASSWORD_DATA,
} from "./ForgotPasswordAction";

const forgotInitialState = {
  initForgotPassword: false,
  isForgotPasswordError: false,
  loggedProfile: {},
};

const ForgotPasswordReducer = (state = forgotInitialState, action) => {
  switch (action.type) {
    case INIT_FORGOTPASSWORD:
      return {
        ...state,
        initForgotPassword: true,
        isForgotPasswordError: false,
        loggedProfile: {},
      };

    case FAILURE_FORGOTPASSWORD:
      return {
        ...state,
        initForgotPassword: false,
        isForgotPasswordError: true,
        loggedProfile: action.data,
      };

    case SET_FORGOTPASSWORD_DATA:
      return {
        ...state,
        initForgotPassword: false,
        isForgotPasswordError: false,
        loggedProfile: action.data,
      };

    case RESET_FORGOTPASSWORD_DATA:
      return {
        ...state,
        initForgotPassword: false,
        isForgotPasswordError: false,
        loggedProfile: {},
      };
    default:
      return state;
  }
};
export default ForgotPasswordReducer;

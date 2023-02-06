import {
  INIT_LOGIN,
  FAILURE_LOGIN,
  SET_LOGIN_DATA,
  RESET_LOGIN_DATA,
} from "./LoginAction";

const loginInitialState = {
  initLogin: false,
  isLoginError: false,
  loggedProfile: {},
};

const LoginReducer = (state = loginInitialState, action) => {
  switch (action.type) {
    case INIT_LOGIN:
      return {
        ...state,
        initLogin: true,
        isLoginError: false,
        loggedProfile: {},
      };

    case FAILURE_LOGIN:
      return {
        ...state,
        initLogin: false,
        isLoginError: true,
        loggedProfile: action.data,
      };

    case SET_LOGIN_DATA:
      return {
        ...state,
        initLogin: false,
        isLoginError: false,
        loggedProfile: action.data,
      };

    case RESET_LOGIN_DATA:
      return {
        ...state,
        initLogin: false,
        isLoginError: false,
        loggedProfile: {},
      };
    default:
      return state;
  }
};
export default LoginReducer;

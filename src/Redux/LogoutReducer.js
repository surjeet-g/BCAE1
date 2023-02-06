import { LOGOUT_INIT, LOGOUT_DATA, LOGOUT_ERROR } from "./AnnouncementAction";

const logoutInitialState = {
  initLogout: false,
  isLogoutError: false,
  logoutData: {},
};

const LogoutReducer = (state = logoutInitialState, action) => {
  switch (action.type) {
    case LOGOUT_INIT:
      return {
        ...state,
        initLogout: true,
        isLogoutError: false,
        logoutData: {},
      };

    case LOGOUT_ERROR:
      return {
        ...state,
        initLogout: false,
        isLogoutError: true,
        logoutData: action.data,
      };

    case LOGOUT_DATA:
      return {
        ...state,
        initLogout: false,
        isLogoutError: false,
        logoutData: action.data,
      };
    default:
      return state;
  }
};
export default LogoutReducer;

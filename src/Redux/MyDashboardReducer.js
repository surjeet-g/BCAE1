import {
  MYDASHBOARD_INIT,
  MYDASHBOARD_DATA,
  MYDASHBOARD_ERROR,
  MYDASHBOARD_INIT_BACKGROUND,
} from "./MyDashboardAction";

import get from "lodash.get";
const myDashboardInitialState = {
  initMyDashboard: false,
  isMyDashboardError: false,
  myDashboardData: {},
  page: 0,
  noData: false,
};

const MyDashboardReducer = (state = myDashboardInitialState, action) => {
  switch (action.type) {
    case MYDASHBOARD_INIT:
      return {
        ...state,
        initMyDashboard: true,
        isMyDashboardError: false,
        initMyDashboardBackground: false,
        myDashboardData: {},
        noData: false,
        page: 0,
      };

    case MYDASHBOARD_ERROR:
      return {
        ...state,
        initMyDashboard: false,
        isMyDashboardError: true,
        initMyDashboardBackground: false,
        myDashboardData: action.data,
      };

    case MYDASHBOARD_DATA:
      const page = action.data.page;
      const count = get(action, "data.result.length", 0);
      const lenData = get(action, "data.result.length", 0);
      if (lenData === 0)
        return {
          ...state,
          noData: true,
          initMyDashboard: false,
          initMyDashboardBackground: false,
        };

      return {
        ...state,
        page,
        noData: false,
        // noData: count === 0,
        initMyDashboard: false,
        initMyDashboardBackground: false,
        isMyDashboardError: false,
        myDashboardData:
          page === 0
            ? action.data.result
            : [...state.myDashboardData, ...action.data.result],
      };
    default:
      return state;
  }
};
export default MyDashboardReducer;

import {
  MYTICKETS_INIT,
  MYTICKETS_DATA,
  MYTICKETS_ERROR,
} from "./MyTicketsAction";

const myTicketsInitialState = {
  initMytickets: false,
  isMyTicketsError: false,
  myTicketsData: {},
};

const MyTicketsReducer = (state = myTicketsInitialState, action) => {
  switch (action.type) {
    case MYTICKETS_INIT:
      return {
        ...state,
        initMytickets: true,
        isMyTicketsError: false,
        myTicketsData: {},
      };

    case MYTICKETS_ERROR:
      return {
        ...state,
        initMytickets: false,
        isMyTicketsError: true,
        myTicketsData: action.data,
      };

    case MYTICKETS_DATA:
      return {
        ...state,
        initMytickets: false,
        isMyTicketsError: false,
        myTicketsData: action.data,
      };
    default:
      return state;
  }
};
export default MyTicketsReducer;

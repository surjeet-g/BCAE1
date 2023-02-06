import {
  MYTICKET_DETAILS_INIT,
  MYTICKET_DETAILS_DATA,
  MYTICKET_DETAILS_ERROR,
} from "./MyTicketDetailsAction";

const myTicketDetailsInitialState = {
  initMyTicketDetails: false,
  isMyTicketDetailsError: false,
  myTicketDetailsData: {},
};

const MyTicketDetailsReducer = (
  state = myTicketDetailsInitialState,
  action
) => {
  switch (action.type) {
    case MYTICKET_DETAILS_INIT:
      return {
        ...state,
        initMyTicketDetails: true,
        isMyTicketDetailsError: false,
        myTicketDetailsData: {},
      };

    case MYTICKET_DETAILS_ERROR:
      return {
        ...state,
        initMyTicketDetails: false,
        isMyTicketDetailsError: true,
        myTicketDetailsData: action.data,
      };

    case MYTICKET_DETAILS_DATA:
      return {
        ...state,
        initMyTicketDetails: false,
        isMyTicketDetailsError: false,
        myTicketDetailsData: action.data,
      };
    default:
      return state;
  }
};
export default MyTicketDetailsReducer;

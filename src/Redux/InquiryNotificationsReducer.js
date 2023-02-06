import {
  INQUIRY_NOTIFICATIONS_INIT,
  INQUIRY_NOTIFICATIONS_DATA,
  INQUIRY_NOTIFICATIONS_ERROR,
} from "./InquiryNotificationsAction";

const inquiryNotificationsInitialState = {
  initInquiryNotifications: false,
  isInquiryNotificationsError: false,
  inquiryNotificationsData: {},
};

const InquiryNotificationsReducer = (
  state = inquiryNotificationsInitialState,
  action
) => {
  switch (action.type) {
    case INQUIRY_NOTIFICATIONS_INIT:
      return {
        ...state,
        initInquiryNotifications: true,
        isInquiryNotificationsError: false,
        inquiryNotificationsData: {},
      };

    case INQUIRY_NOTIFICATIONS_ERROR:
      return {
        ...state,
        initInquiryNotifications: false,
        isInquiryNotificationsError: true,
        inquiryNotificationsData: action.data,
      };

    case INQUIRY_NOTIFICATIONS_DATA:
      return {
        ...state,
        initInquiryNotifications: false,
        isInquiryNotificationsError: false,
        inquiryNotificationsData: action.data,
      };
    default:
      return state;
  }
};
export default InquiryNotificationsReducer;

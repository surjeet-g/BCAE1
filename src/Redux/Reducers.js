import { combineReducers } from "redux";

import LoginReducer from "../Screens/Login/LoginReducer";
import RegisterFormReducer from "../Screens/Register/RegisterReducer";
import MyTicketsReducer from "../Redux/MyTicketsReducer";
import MyTicketDetailsReducer from "../Redux/MyTicketDetailsReducer";
import AnnouncementsReducer from "./AnnouncementReducer";
import SavedLocationReducer from "./SavedLocationReducer";
import ForgotPasswordReducer from "../Screens/ForgotPassword/ForgotPasswordReducer";
import ProfileReducer from "./ProfileReducer";
import MyDashboardReducer from "./MyDashboardReducer";
import InquiryReducer from "./InquiryReducer";
import AttachmentReducer from "./AttachmentReducer";
import FollowUpReducer from "./FollowUpReducer";
import LogoutReducer from "./LogoutReducer";
import NotificationsReducer from "./NotificationsReducer";
import InquiryNotificationsReducer from "./InquiryNotificationsReducer";
import { LOGOUT_DATA } from "./LogoutAction";

const appReducer = combineReducers({
  notifications: NotificationsReducer,
  followup: FollowUpReducer,
  attachment: AttachmentReducer,
  login: LoginReducer,
  registerForm: RegisterFormReducer,
  myTickets: MyTicketsReducer,
  myTicketDetails: MyTicketDetailsReducer,
  myDashboardData: MyDashboardReducer,
  announcements: AnnouncementsReducer,
  savedLocations: SavedLocationReducer,
  profile: ProfileReducer,
  forgot: ForgotPasswordReducer,
  enquiry: InquiryReducer,
  logout: LogoutReducer,
  inquiryNotifications: InquiryNotificationsReducer,
});

const RootReducer = (state, action) => {
  if (action.type === LOGOUT_DATA) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default RootReducer;

import {
  NOTIFICATIONS_INIT,
  NOTIFICATIONS_DATA,
  NOTIFICATIONS_ERROR,
} from "./NotificationsAction";

const DATA = [
  {
    title: "title name ",
    createdAt: "2022-09-08T16:57:19.445Z",
    description:
      "descipriotn descipriotndescipriotndescipriotndescipriotndescipriotndescipriotn",
  },
  {
    createdAt: "2022-09-08T16:57:19.445Z",
    title: "title name ",
    description:
      "descipriotn descipriotndescipriotndescipriotndescipriotndescipriotndescipriotn",
  },
];
const notificationsInitialState = {
  initNotifications: false,
  isNotificationsError: false,
  notificationsData: DATA,
};

const NotificationsReducer = (state = notificationsInitialState, action) => {
  switch (action.type) {
    case NOTIFICATIONS_INIT:
      return {
        ...state,
        initNotifications: true,
        isNotificationsError: false,
        notificationsData: {},
      };

    case NOTIFICATIONS_ERROR:
      return {
        ...state,
        initNotifications: false,
        isNotificationsError: true,
        notificationsData: action.data,
      };

    case NOTIFICATIONS_DATA:
      return {
        ...state,
        initNotifications: false,
        isNotificationsError: false,
        notificationsData: action.data,
      };
    default:
      return state;
  }
};
export default NotificationsReducer;

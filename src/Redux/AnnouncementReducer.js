import {
  ANNOUNCEMENTS_INIT,
  ANNOUNCEMENTS_DATA,
  ANNOUNCEMENTS_ERROR,
} from "./AnnouncementAction";

const announcementsInitialState = {
  initAnnouncements: false,
  isAnnouncementsError: false,
  announcementsData: {},
};

const AnnouncementsReducer = (state = announcementsInitialState, action) => {
  switch (action.type) {
    case ANNOUNCEMENTS_INIT:
      return {
        ...state,
        initAnnouncements: true,
        isAnnouncementsError: false,
        announcementsData: {},
      };

    case ANNOUNCEMENTS_ERROR:
      return {
        ...state,
        initAnnouncements: false,
        isAnnouncementsError: true,
        announcementsData: action.data,
      };

    case ANNOUNCEMENTS_DATA:
      console.log("reducers 7");
      return {
        ...state,
        initAnnouncements: false,
        isAnnouncementsError: false,
        announcementsData: action.data,
      };
    default:
      return state;
  }
};
export default AnnouncementsReducer;

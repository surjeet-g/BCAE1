import { PROFILE_INIT, PROFILE_DATA, PROFILE_ERROR } from "./ProfileAction";

const mySavedProfileInitialState = {
  initProfile: false,
  profileError: false,
  savedProfileData: {},
};

const ProfileReducer = (state = mySavedProfileInitialState, action) => {
  switch (action.type) {
    case PROFILE_INIT:
      return {
        ...state,
        initProfile: true,
        profileError: false,
        savedProfileData: {},
      };
    case PROFILE_DATA:
      return {
        ...state,
        initProfile: false,
        profileError: false,
        savedProfileData: action.data,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        initProfile: false,
        profileError: true,
        savedProfileData: action.data,
      };
    default:
      return state;
  }
};
export default ProfileReducer;

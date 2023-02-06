import {
  SAVEDLOCATION_INIT,
  SAVEDLOCATION_DATA,
  SAVEDLOCATION_ERROR,
  ADDRESSLOOKUP_DATA,
} from "./SavedLocationAction";

const mySavedLocationInitialState = {
  initSavedLocation: false,
  savedLocationError: false,
  savedLocationData: {},
  addressLoopupData: {},
};

const SavedLocationReducer = (state = mySavedLocationInitialState, action) => {
  switch (action.type) {
    case SAVEDLOCATION_INIT:
      return {
        ...state,
        initSavedLocation: true,
        savedLocationError: false,
        savedLocationData: [],
        addressLoopupData: [],
      };
    case SAVEDLOCATION_DATA:
      return {
        ...state,
        initSavedLocation: false,
        savedLocationError: false,
        savedLocationData: action.data,
      };
    case ADDRESSLOOKUP_DATA:
      return {
        ...state,
        addressLoopupData: action.data,
      };
    case SAVEDLOCATION_ERROR:
      return {
        ...state,
        initSavedLocation: false,
        savedLocationError: true,
        savedLocationData: action.data,
      };
    default:
      return state;
  }
};
export default SavedLocationReducer;

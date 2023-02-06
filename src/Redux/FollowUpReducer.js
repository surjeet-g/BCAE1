import {
  FOLLOWUP_INIT,
  GETFOLLOWUPWITHATTTACHMENT_DATA,
  GETFOLLOWUPWITHATTTACHMENT_ERROR,
  FOLLOWUP_DATA,
  FOLLOWUP_ERROR,
  INSERTFOLLOWUP_DATA,
  INSERTFOLLOWUP_ERROR,
} from "./FollowUpAction";

const followupInitialState = {
  initFollowUp: false,
  isFollowUpError: false,
  followupData: {},
  isgetFollowUpWithAtttachmentError: false,
  getfollowupwithatttachmentData: {},
  initgetFollowUpWithAtttachment: false,
  insertfollowupData: {},
  isInsertFollowUpError: false,
  initInsertFollowUp: false,
};

const FollowUpReducer = (state = followupInitialState, action) => {
  switch (action.type) {
    case FOLLOWUP_INIT:
      return {
        ...state,
        initFollowUp: true,
        isFollowUpError: false,
        followupData: {},
        getfollowupwithatttachmentData: {},
        insertfollowupData: {},
        isInsertFollowUpError: false,
        initInsertFollowUp: false,
      };

    case FOLLOWUP_ERROR:
      return {
        ...state,
        initFollowUp: false,
        isFollowUpError: true,
        followupData: action.data,
      };

    case FOLLOWUP_DATA:
      return {
        ...state,
        initFollowUp: false,
        isFollowUpError: false,
        followupData: action.data,
      };
    case GETFOLLOWUPWITHATTTACHMENT_ERROR:
      return {
        ...state,
        initgetFollowUpWithAtttachment: false,
        isgetFollowUpWithAtttachmentError: true,
        getfollowupwithatttachmentData: action.data,
      };

    case GETFOLLOWUPWITHATTTACHMENT_DATA:
      return {
        ...state,
        initgetFollowUpWithAtttachment: false,
        isgetFollowUpWithAtttachmentError: false,
        getfollowupwithatttachmentData: action.data,
      };
    case INSERTFOLLOWUP_ERROR:
      return {
        ...state,
        initInsertFollowUp: false,
        isInsertFollowUpError: true,
        insertfollowupData: action.data,
      };

    case INSERTFOLLOWUP_DATA:
      return {
        ...state,
        initInsertFollowUp: false,
        isInsertFollowUpError: false,
        insertfollowupData: action.data,
      };
    default:
      return state;
  }
};
export default FollowUpReducer;

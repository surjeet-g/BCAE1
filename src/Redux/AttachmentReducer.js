import {
  ATTACHMENT_INIT,
  ATTACHMENT_DATA,
  ATTACHMENT_ERROR,
  ATTACHMENT_UPLOAD_DATA,
  ATTACHMENT_UPLOAD_INIT,
  ATTACHMENT_UPLOAD_ERROR,
} from "./AttachmentAction";

const attachmentInitialState = {
  initAttachment: false,
  isAttachmentError: false,
  attachmentData: {},
  initAttachmentUpload: false,
  isAttachmentUploadError: false,
  attachmentUploadData: [],
};

const AttachmentReducer = (state = attachmentInitialState, action) => {
  switch (action.type) {
    case ATTACHMENT_UPLOAD_INIT:
      return {
        ...state,
        initAttachmentUpload: false,
        isAttachmentUploadError: false,
        attachmentUploadData: [],
      };

    case ATTACHMENT_UPLOAD_ERROR:
      return {
        ...state,
        initAttachmentUpload: false,
        isAttachmentUploadError: true,
        // attachmentUploadData: action.data,
      };

    case ATTACHMENT_UPLOAD_DATA:
      const ids = [...state.attachmentUploadData, ...[action.data]];
      const temp = {
        ...state,
        initAttachmentUpload: false,
        isAttachmentUploadError: false,
        attachmentUploadData: ids,
      };
      return temp;

    case ATTACHMENT_INIT:
      return {
        ...state,
        initAttachment: true,
        isAttachmentError: false,
        attachmentData: {},
      };

    case ATTACHMENT_ERROR:
      return {
        ...state,
        initAttachment: false,
        isAttachmentError: true,
        attachmentData: action.data,
      };

    case ATTACHMENT_DATA:
      return {
        ...state,
        initAttachment: false,
        isAttachmentError: false,
        attachmentData: action.data,
      };
    default:
      return state;
  }
};
export default AttachmentReducer;

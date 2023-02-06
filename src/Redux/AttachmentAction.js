export const ATTACHMENT_INIT = "ATTACHMENT_INIT";
export const ATTACHMENT_DATA = "ATTACHMENT_DATA";
export const ATTACHMENT_ERROR = "ATTACHMENT_ERROR";

export const ATTACHMENT_UPLOAD_INIT = "ATTACHMENT_UPLOAD_INIT";
export const ATTACHMENT_UPLOAD_DATA = "ATTACHMENT_UPLOAD_DATA";
export const ATTACHMENT_UPLOAD_ERROR = "ATTACHMENT_UPLOAD_ERROR";

export function initAttachmentUploadData() {
  return { type: ATTACHMENT_UPLOAD_INIT };
}

export function setAttachmentUploadData(data) {
  return { type: ATTACHMENT_UPLOAD_DATA, data };
}

export function setAttachmentUploadError(data) {
  return { type: ATTACHMENT_UPLOAD_ERROR, data };
}

export function initAttachmentData() {
  return { type: ATTACHMENT_INIT };
}

export function setAttachmentData(data) {
  return { type: ATTACHMENT_DATA, data };
}

export function setAttachmentError(data) {
  return { type: ATTACHMENT_ERROR, data };
}

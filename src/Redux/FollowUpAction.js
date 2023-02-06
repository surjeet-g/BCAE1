export const INSERTFOLLOWUP_DATA = "INSERTFOLLOWUP_DATA";
export const INSERTFOLLOWUP_ERROR = "INSERTFOLLOWUP_ERROR";
export const GETFOLLOWUPWITHATTTACHMENT_DATA =
  "GETFOLLOWUPWITHATTTACHMENT_DATA";
export const GETFOLLOWUPWITHATTTACHMENT_ERROR =
  "GETFOLLOWUPWITHATTTACHMENT_ERROR";
export const FOLLOWUP_INIT = "FOLLOWUP_INIT";
export const FOLLOWUP_DATA = "FOLLOWUP_DATA";
export const FOLLOWUP_ERROR = "FOLLOWUP_ERROR";

export function initFollowUpData() {
  return { type: FOLLOWUP_INIT };
}

export function setFollowUpData(data) {
  return { type: FOLLOWUP_DATA, data };
}

export function setFollowUpError(data) {
  return { type: FOLLOWUP_ERROR, data };
}
export function setFollowUpWithAtttachmentData(data) {
  return { type: GETFOLLOWUPWITHATTTACHMENT_DATA, data };
}

export function setFollowUpWithAtttachmentError(data) {
  return { type: GETFOLLOWUPWITHATTTACHMENT_ERROR, data };
}
export function setInsertFollowUpData(data) {
  return { type: INSERTFOLLOWUP_DATA, data };
}

export function setInsertFollowUpError(data) {
  return { type: INSERTFOLLOWUP_ERROR, data };
}

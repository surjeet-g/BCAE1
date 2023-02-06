export const INQUIRY_NOTIFICATIONS_INIT = "INQUIRY_NOTIFICATIONS_INIT";
export const INQUIRY_NOTIFICATIONS_DATA = "INQUIRY_NOTIFICATIONS_DATA";
export const INQUIRY_NOTIFICATIONS_ERROR = "INQUIRY_NOTIFICATIONS_ERROR";

export function initInquiryNotificationsData() {
  return { type: INQUIRY_NOTIFICATIONS_INIT };
}

export function setInquiryNotificationsData(data) {
  return { type: INQUIRY_NOTIFICATIONS_DATA, data };
}

export function setInquiryNotificationsError(data) {
  return { type: INQUIRY_NOTIFICATIONS_ERROR, data };
}

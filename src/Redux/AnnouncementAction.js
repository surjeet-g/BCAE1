export const ANNOUNCEMENTS_INIT = "ANNOUNCEMENTS_INIT";
export const ANNOUNCEMENTS_DATA = "ANNOUNCEMENTS_DATA";
export const ANNOUNCEMENTS_ERROR = "ANNOUNCEMENTS_ERROR";

export function initAnnouncementsData() {
  return { type: ANNOUNCEMENTS_INIT };
}

export function setAnnouncementsData(data) {
  return { type: ANNOUNCEMENTS_DATA, data };
}

export function setAnnouncementsError(data) {
  return { type: ANNOUNCEMENTS_ERROR, data };
}

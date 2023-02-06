export const MYTICKET_DETAILS_INIT = "MYTICKET_DETAILS_INIT";
export const MYTICKET_DETAILS_DATA = "MYTICKET_DETAILS_DATA";
export const MYTICKET_DETAILS_ERROR = "MYTICKET_DETAILS_ERROR";
export const MYDASHBOARD_INIT_BACKGROUND = "MYDASHBOARD_INIT_BACKGROUND";

export function initMyTicketDetailsData() {
  return { type: MYTICKET_DETAILS_INIT };
}

export function initMyTicketDetailsDataBackground(data) {
  return { type: MYDASHBOARD_INIT_BACKGROUND, data };
}

export function setMyTicketDetailsData(data) {
  return { type: MYTICKET_DETAILS_DATA, data };
}

export function setMyTicketDetailsError(data) {
  return { type: MYTICKET_DETAILS_ERROR, data };
}

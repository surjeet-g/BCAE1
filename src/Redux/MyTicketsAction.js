export const MYTICKETS_INIT = "MYTICKETS_INIT";
export const MYTICKETS_DATA = "MYTICKETS_DATA";
export const MYTICKETS_ERROR = "MYTICKETS_ERROR";

export function initMyTicketsData() {
  return { type: MYTICKETS_INIT };
}

export function setMyTicketsData(data) {
  return { type: MYTICKETS_DATA, data };
}

export function setMyTicketsError(data) {
  return { type: MYTICKETS_ERROR, data };
}

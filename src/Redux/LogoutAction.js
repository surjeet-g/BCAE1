export const LOGOUT_INIT = "LOGOUT_INIT";
export const LOGOUT_DATA = "LOGOUT_DATA";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

export function initLogoutData() {
  return { type: LOGOUT_INIT };
}

export function setLogoutData(data) {
  return { type: LOGOUT_DATA, data };
}

export function setLogoutError(data) {
  return { type: LOGOUT_ERROR, data };
}

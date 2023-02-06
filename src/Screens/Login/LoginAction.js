export const INIT_LOGIN = "INIT_LOGIN";
export const FAILURE_LOGIN = "FAILURE_LOGIN";
export const SET_LOGIN_DATA = "SET_LOGIN_DATA";
export const RESET_LOGIN_DATA = "RESET_LOGIN_DATA";

export function initLoginData() {
  return { type: INIT_LOGIN };
}
export function failureLogin(data) {
  return { type: FAILURE_LOGIN, data };
}

export function setLoginData(data) {
  return { type: SET_LOGIN_DATA, data };
}

export function resetLoginData() {
  return { type: RESET_LOGIN_DATA };
}

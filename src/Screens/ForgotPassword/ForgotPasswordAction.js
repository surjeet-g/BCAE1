export const INIT_FORGOTPASSWORD = "INIT_FORGOTPASSWORD";
export const FAILURE_FORGOTPASSWORD = "FAILURE_FORGOTPASSWORD";
export const SET_FORGOTPASSWORD_DATA = "SET_FORGOTPASSWORD_DATA";
export const RESET_FORGOTPASSWORD_DATA = "RESET_FORGOTPASSWORD_DATA";

export function initForgotPasswordData() {
  console.log("initForgotPasswordData===>");
  return { type: INIT_FORGOTPASSWORD };
}
export function failureForgotPassword(data) {
  return { type: FAILURE_FORGOTPASSWORD, data };
}

export function setForgotPasswordData(data) {
  return { type: SET_FORGOTPASSWORD_DATA, data };
}

export function resetForgotPasswordData() {
  return { type: RESET_FORGOTPASSWORD_DATA };
}

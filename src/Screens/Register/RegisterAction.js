export const INIT_REGISTRE_FORM = "INIT_REGISTRE_FORM";
export const SET_REGISTRE_FORM = "SET_REGISTRE_FORM";
export const FAILURE_REGISTRE_FORM = "FAILURE_REGISTRE_FORM";
export const INIT_OTP_FORM = "INIT_OTP_FORM";
export const SET_OTP_FORM = "SET_OTP_FORM";
export const FAILURE_OTP_FORM = "FAILURE_OTP_FORM";
export const ADDRESSLOOKUP_DATA = "ADDRESSLOOKUP_DATA";

export function initRegisterForm() {
  return { type: INIT_REGISTRE_FORM };
}
export function setRegisterFormData(data) {
  return { type: SET_REGISTRE_FORM, data };
}
export function failureRegisterFormData(data) {
  return { type: FAILURE_REGISTRE_FORM, data };
}

export function initOtpForm(usage_type) {
  return { type: INIT_OTP_FORM, usageType: usage_type };
}
export function setOtpFormData(data, usage_type) {
  return { type: SET_OTP_FORM, data, usageType: usage_type };
}
export function failureOtpFormData(data, usage_type) {
  return { type: FAILURE_OTP_FORM, data, usageType: usage_type };
}

export function setAddressLoopUpData(data, usage_type) {
  return { type: ADDRESSLOOKUP_DATA, data, usageType: usage_type };
}

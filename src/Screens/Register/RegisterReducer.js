import {
  INIT_REGISTRE_FORM,
  SET_REGISTRE_FORM,
  FAILURE_REGISTRE_FORM,
  INIT_OTP_FORM,
  SET_OTP_FORM,
  FAILURE_OTP_FORM,
  ADDRESSLOOKUP_DATA,
} from "./RegisterAction";

const registerInitialState = {
  initRegisterForm: false,
  isRegisterFormError: false,
  registerFormData: {},
  initOtpForm: false,
  isOtpFormError: false,
  otpFormData: {},
  addressLoopupData: {},
};

const RegisterFormReducer = (state = registerInitialState, action) => {
  switch (action.type) {
    case INIT_REGISTRE_FORM:
      return {
        ...state,
        initRegisterForm: true,
        isRegisterFormError: false,
        registerFormData: {},
        addressLoopupData: [],
      };

    case SET_REGISTRE_FORM:
      return {
        ...state,
        initRegisterForm: false,
        isRegisterFormError: false,
        registerFormData: action.data,
      };
    case ADDRESSLOOKUP_DATA:
      return {
        ...state,
        addressLoopupData: action.data,
      };
    case FAILURE_REGISTRE_FORM:
      return {
        ...state,
        initRegisterForm: false,
        isRegisterFormError: true,
        registerFormData: action.data,
      };
    case INIT_OTP_FORM:
      if (action.usageType === "mobile") {
        return {
          ...state,
          initOtpForm: true,
          isOtpFormError: false,
          otpFormDataForMobile: {},
          otpUsageType: action.usageType,
        };
      } else if (action.usageType === "email") {
        return {
          ...state,
          initOtpForm: true,
          isOtpFormError: false,
          otpFormDataForEmail: {},
          otpUsageType: action.usageType,
        };
      } else if (action.usageType === "emailOtp") {
        return {
          ...state,
          initOtpForm: true,
          isOtpFormError: false,
          otpFormDataForEmail: {},
          otpUsageType: action.usageType,
        };
      } else if (action.usageType === "mobileOtp") {
        return {
          ...state,
          initOtpForm: true,
          isOtpFormError: false,
          otpFormDataForMobile: {},
          otpUsageType: action.usageType,
        };
      } else if (action.usageType === "Register") {
        return {
          ...state,
          initOtpForm: true,
          isOtpFormError: false,
          otpFormData: {},
          otpUsageType: action.usageType,
        };
      } else {
        return state;
      }

    case SET_OTP_FORM:
      if (action.usageType === "mobile") {
        return {
          ...state,
          initOtpForm: false,
          isOtpFormError: false,
          otpFormDataForMobile: action.data,
          otpUsageType: action.usageType,
        };
      } else if (action.usageType === "email") {
        return {
          ...state,
          initOtpForm: false,
          isOtpFormError: false,
          otpFormDataForEmail: action.data,
          otpUsageType: action.usageType,
        };
      } else if (action.usageType === "emailOtp") {
        return {
          ...state,
          initOtpForm: false,
          isOtpFormError: false,
          otpFormDataForEmail: action.data,
          otpUsageType: action.usageType,
        };
      } else if (action.usageType === "Register") {
        return {
          ...state,
          initOtpForm: false,
          isOtpFormError: false,
          otpFormData: action.data,
          otpUsageType: action.usageType,
        };
      } else if (action.usageType === "mobileOtp") {
        return {
          ...state,
          initOtpForm: false,
          isOtpFormError: false,
          otpFormDataForMobile: action.data,
          otpUsageType: action.usageType,
        };
      } else {
        return state;
      }

    case FAILURE_OTP_FORM:
      if (action.usageType === "mobile") {
        return {
          ...state,
          initOtpForm: false,
          isOtpFormError: true,
          otpFormDataForMobile: action.data,
          otpUsageType: action.usageType,
        };
      } else if (action.usageType === "email") {
        return {
          ...state,
          initOtpForm: false,
          isOtpFormError: true,
          otpFormDataForEmail: action.data,
          otpUsageType: action.usageType,
        };
      } else if (action.usageType === "emailOtp") {
        return {
          ...state,
          initOtpForm: false,
          isOtpFormError: true,
          otpFormDataForEmail: action.data,
          otpUsageType: action.usageType,
        };
      } else if (action.usageType === "Register") {
        return {
          ...state,
          initOtpForm: false,
          isOtpFormError: true,
          otpFormData: action.data,
          otpUsageType: action.usageType,
        };
      } else if (action.usageType === "mobileOtp") {
        return {
          ...state,
          initOtpForm: false,
          isOtpFormError: true,
          otpFormDataForMobile: action.data,
          otpUsageType: action.usageType,
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};
export default RegisterFormReducer;

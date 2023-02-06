import {
  initRegisterForm,
  setRegisterFormData,
  failureRegisterFormData,
  initOtpForm,
  setOtpFormData,
  failureOtpFormData,
  setAddressLoopUpData,
} from "./RegisterAction";
import Toast from "react-native-toast-message";

import { serverCall } from "../../Utilities/API";
import { endPoints, requestMethod } from "../../Utilities/API/ApiConstants";

export function fetchRegisterFormData() {
  return async (dispatch) => {
    dispatch(initRegisterForm());

    let params = {};
    let addressLookUpResult = await serverCall(
      endPoints.ADDRESS_LOOKUP_REGISTRATION,
      requestMethod.GET,
      params
    );
    console.log(
      "result.success outside :" + JSON.stringify(addressLookUpResult)
    );
    if (addressLookUpResult) {
      //result.data.data.
      dispatch(setAddressLoopUpData(addressLookUpResult?.data?.data));

      let params = ["LOCATION", "COUNTRY", "USER_TYPE", "GENDER", "PROD_TYPE"];
      let result = await serverCall(
        endPoints.GET_REGISTER_FORM_DATA,
        requestMethod.POST,
        params
      );
      if (result.success && result?.data?.data) {
        let serviceCode = {
          SERVICECODE: [
            {
              code: "",
              description: "TD123",
              codeType: "TD123",
              mapping: null,
              status: "AC",
            },
          ],
        };

        let Data = Object.assign(result.data.data, serviceCode);
        dispatch(setRegisterFormData(result.data.data));
      } else {
        dispatch(failureRegisterFormData(result));
      }
    }
  };
}

export function sendOtp(
  mobileno,
  firstname,
  type,
  showOtpSentMessage = () => {}
) {
  return async (dispatch) => {
    dispatch(initOtpForm(type));
    let servicePoint = "";
    let params = {};
    if (type === "email") {
      servicePoint = endPoints.GET_OTP_FOR_EMAIL;

      params = {
        reference: mobileno,
        firstName: firstname,
      };
    } else {
      servicePoint = endPoints.GET_OTP_FOR_MOBILE;
      params = {
        reference: mobileno,
        firstName: firstname,
      };
    }

    let result = await serverCall(servicePoint, requestMethod.POST, params);

    if (result.success && result?.data) {
      Toast.show({
        type: "bctSuccess",
        text1: result?.data?.message || "",
      });
      showOtpSentMessage();
      dispatch(setOtpFormData(result?.data, type));
    } else {
      dispatch(failureOtpFormData(result, type));
    }
  };
}

export function getOtpForCheck(mobileno, type) {
  return async (dispatch) => {
    dispatch(initOtpForm(type));
    let servicePoint = "";
    let params = {};

    servicePoint = endPoints.CHECK_OTP + mobileno;

    let result = await serverCall(servicePoint, requestMethod.GET, params);
    if (result.success && result?.data?.data) {
      dispatch(setOtpFormData(result?.data, type));
    } else {
      dispatch(failureOtpFormData(result, type));
    }
  };
}

export function userRegister(params, type, cbSuccess = (_) => {}) {
  return async (dispatch) => {
    dispatch(initOtpForm(type));
    const servicePoint = endPoints.REGISTER;

    let result = await serverCall(servicePoint, requestMethod.POST, params);
    if (result.success && result?.data?.data) {
      cbSuccess(result?.data?.message);
      dispatch(setOtpFormData(result?.data, type));
    } else {
      Toast.show({
        type: "bctError",
        text1: result?.message,
      });
      dispatch(failureOtpFormData(result, type));
    }
  };
}

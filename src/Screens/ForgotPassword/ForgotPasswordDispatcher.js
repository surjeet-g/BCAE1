import {
  initForgotPasswordData,
  failureForgotPassword,
  setForgotPasswordData,
  resetForgotPasswordData,
} from "./ForgotPasswordAction";
import { serverCall } from "../../Utilities/API";
import { endPoints, requestMethod } from "../../Utilities/API/ApiConstants";
import { saveToken, getToken } from "../../Storage/token";
import { passwordHash } from "../../Utilities/Constants/Constant";
import Toast from "react-native-toast-message";

export function verifyForgotPasswordData(navigation, username) {
  return async (dispatch) => {
    dispatch(initForgotPasswordData());
    let params = {
      email: username,
    };
    let result = await serverCall(
      endPoints.FORGOT_PASSWORD,
      requestMethod.POST,
      params
    );
    console.log("===success===", result);
    if (result.success) {
      dispatch(setForgotPasswordData(result.data));
      dispatch(resetForgotPasswordData());
      navigation.replace("ConfirmForgotPassword", { email: username });
    } else {
      Toast.show({
        type: "bctError",
        text1: result?.message || "",
      });
      dispatch(failureForgotPassword(result));
    }
  };
}

export function resetForgotPassword() {
  return async (dispatch) => {
    dispatch(resetForgotPasswordData());
  };
}

export function changePassword(
  email,
  oldPassword,
  newPassword,
  confirmPassword
) {
  return async (dispatch) => {
    dispatch(initForgotPasswordData());

    const oldPasswordHash = await passwordHash(oldPassword);
    const newPasswordHash = await passwordHash(newPassword);
    const confirmPasswordHash = await passwordHash(confirmPassword);

    let params = {
      email: email,
      oldPassword: oldPasswordHash,
      newPassword: newPasswordHash,
      confirmPassword: confirmPasswordHash,
    };

    let result = await serverCall(
      endPoints.CHANGE_PASSWORD,
      requestMethod.POST,
      params
    );
    console.log(JSON.stringify(result));
    if (result.success) {
      dispatch(setForgotPasswordData(result.data));
    } else {
      dispatch(failureForgotPassword(result));
    }
  };
}

export function resetPasswordChangeData() {
  return async (dispatch) => {
    dispatch(setForgotPasswordData([]));
  };
}

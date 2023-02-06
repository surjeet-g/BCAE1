import { initLogoutData, setLogoutData, setLogoutError } from "./LogoutAction";
import { serverCall } from "..//Utilities/API";
import { endPoints, requestMethod } from "../../src/Utilities/API/ApiConstants";
import { saveToken, getDataFromDB } from "../Storage/token";
import { storageKeys } from "../Utilities/Constants/Constant";
import { removeAsyncItem } from "../Storage/DB";

export function logoutUser(navigation, userId) {
  return async (dispatch) => {
    dispatch(initLogoutData());
    getDataFromDB(storageKeys.FCM_DEVICE_ID)
      .then(function (deviceId) {
        return deviceId;
      })
      .then(async (fcmDeviceId) => {
        let params = {
          userId: userId,
          deviceId: fcmDeviceId,
        };
        let result = await serverCall(
          endPoints.LOGOUT_USER,
          requestMethod.POST,
          params
        );
        console.log("result====================>" + JSON.stringify(result));
        if (result.success) {
          dispatch(setLogoutData(result?.data?.data));

          await removeAsyncItem(storageKeys.DASHBOARD_DATA);
          await removeAsyncItem(storageKeys.FCM_DEVICE_ID);
          await removeAsyncItem(storageKeys.PROFILE_DETAILS);
          await removeAsyncItem(storageKeys.SAVED_LOCATION);
          await removeAsyncItem(storageKeys.LANGUAGE_KEY);
          await removeAsyncItem(storageKeys.PUSH_NOTIFICATION);
          await removeAsyncItem(storageKeys.REFRESH_TOKEN);
          await removeAsyncItem(storageKeys.ACCESS_TOKEN);

          navigation.navigate("Splash", {});
        } else {
          dispatch(setLogoutError(result));
        }
      });
  };
}

export function deleteNdLogoutUser(navigation, userData) {
  return async (dispatch) => {
    dispatch(initLogoutData());
    getDataFromDB(storageKeys.FCM_DEVICE_ID)
      .then(function (deviceId) {
        return deviceId;
      })
      .then(async (fcmDeviceId) => {
        let params = {
          contactNo: userData?.contactNo,
          email: userData?.email,
          status: 1,
        };

        let result = await serverCall(
          endPoints.DELETE_ACCOUNT,
          requestMethod.POST,
          params
        );

        if (result.success) {
          dispatch(setLogoutData(result?.data?.data));

          await removeAsyncItem(storageKeys.DASHBOARD_DATA);
          await removeAsyncItem(storageKeys.FCM_DEVICE_ID);
          await removeAsyncItem(storageKeys.PROFILE_DETAILS);
          await removeAsyncItem(storageKeys.SAVED_LOCATION);
          await removeAsyncItem(storageKeys.LANGUAGE_KEY);
          await removeAsyncItem(storageKeys.PUSH_NOTIFICATION);
          await removeAsyncItem(storageKeys.REFRESH_TOKEN);
          await removeAsyncItem(storageKeys.ACCESS_TOKEN);

          navigation.navigate("Splash", {});
        } else {
          console.warn("err");
          dispatch(setLogoutError(result));
        }
      });
  };
}

export function logoutUserSectionTimeOut(navigation, userId) {
  return async (dispatch) => {
    dispatch(setLogoutData("logout"));
    await removeAsyncItem(storageKeys.DASHBOARD_DATA);
    await removeAsyncItem(storageKeys.FCM_DEVICE_ID);
    await removeAsyncItem(storageKeys.PROFILE_DETAILS);
    await removeAsyncItem(storageKeys.SAVED_LOCATION);
    await removeAsyncItem(storageKeys.LANGUAGE_KEY);
    await removeAsyncItem(storageKeys.PUSH_NOTIFICATION);
    await removeAsyncItem(storageKeys.REFRESH_TOKEN);
    await removeAsyncItem(storageKeys.ACCESS_TOKEN);

    navigation.navigate("Splash", {});
  };
}

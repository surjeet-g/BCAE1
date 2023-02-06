import {
  initLoginData,
  failureLogin,
  setLoginData,
  resetLoginData,
} from "./LoginAction";
import { serverCall } from "../../Utilities/API";
import { endPoints, requestMethod } from "../../Utilities/API/ApiConstants";
import { saveDataToDB, getDataFromDB } from "../../Storage/token";
import {
  storageKeys,
  DEFAULT_PROFILE_IMAGE,
} from "../../Utilities/Constants/Constant";
import { Platform } from "react-native";

export function verifyLoginData(navigation, username, password) {
  return async (dispatch) => {
    dispatch(initLoginData());

    getDataFromDB(storageKeys.FCM_DEVICE_ID)
      .then(function (deviceId) {
        return deviceId;
      })
      .then(async (fcmDeviceId) => {
        let params = {
          loginId: username,
          loginPassword: password,
          device: {
            deviceId: fcmDeviceId,
            deviceType: Platform.OS,
          },
        };

        console.log("fcm token for login ", fcmDeviceId);

        let result = await serverCall(
          endPoints.USER_LOGIN,
          requestMethod.POST,
          params
        );
        if (result.success) {
          if (
            result?.data?.data?.userDetails?.status &&
            (result?.data?.data?.userDetails?.status).includes("TEMP")
          ) {
            dispatch(setLoginData(result.data));
            navigation.navigate("ResetPassword", {
              email: result?.data?.data?.userDetails?.email,
              inviteToken: result?.data?.data?.userDetails?.inviteToken,
            });
          } else {
            let userId = result?.data?.data?.userDetails?.user?.userId;
            let customerId = result?.data?.data?.userDetails?.user?.customerId;

            let accessTokenData = {
              accessToken: result?.data?.data?.userDetails?.accessToken ?? "",
            };
            let refreshTokenData = {
              refreshToken: result?.data?.data?.userDetails?.refreshToken ?? "",
            };
            //alert(JSON.stringify(result?.data?.data?.userDetails))
            await saveDataToDB(storageKeys.ACCESS_TOKEN, accessTokenData);
            await saveDataToDB(storageKeys.REFRESH_TOKEN, refreshTokenData);

            let profileParams = {};

            let profileResult = await serverCall(
              endPoints.PROFILE_DETAILS +
                "/" +
                result?.data?.data?.userDetails?.user?.userId,
              requestMethod.GET,
              profileParams
            );

            if (profileResult.success) {
              let profileData = {
                currDeptId: result?.data?.data?.userDetails?.currDeptId ?? "",
                userId: profileResult?.data?.data?.userId ?? "",
                customerId: profileResult?.data?.data?.customerId ?? "",
                contactNo: profileResult?.data?.data?.contactNo ?? "",
                email: profileResult?.data?.data?.email ?? "",
                profilePicture: profileResult?.data?.data?.profilePicture
                  ? profileResult?.data?.data?.profilePicture
                  : DEFAULT_PROFILE_IMAGE,
                firstName: profileResult?.data?.data?.firstName ?? "",
                lastName: profileResult?.data?.data?.lastName ?? "",
                gender: profileResult?.data?.data?.gender ?? "",
                status: profileResult?.data?.data?.status ?? "",
                location: profileResult?.data?.data?.location,
                hno: profileResult?.data?.data?.address?.hno ?? "",
                block: profileResult?.data?.data?.address?.block ?? "",
                street: profileResult?.data?.data?.address?.street ?? "",
                buildingName:
                  profileResult?.data?.data?.address?.buildingName ?? "",
                road: profileResult?.data?.data?.address?.road ?? "",
                city: profileResult?.data?.data?.address?.city ?? "",
                town: profileResult?.data?.data?.address?.town ?? "",
                state: profileResult?.data?.data?.address?.state ?? "",
                district: profileResult?.data?.data?.address?.district ?? "",
                country: profileResult?.data?.data?.address?.country ?? "",
                latitude: profileResult?.data?.data?.address?.latitude ?? "",
                longitude: profileResult?.data?.data?.address?.longitude ?? "",
                postCode: profileResult?.data?.data?.address?.postCode ?? "",
              };

              await saveDataToDB(storageKeys.PROFILE_DETAILS, profileData);

              getDataFromDB(storageKeys.PROFILE_DETAILS).then((resultData) => {
                if (resultData) {
                  //result.data.data
                  dispatch(setLoginData(result.data));
                  navigation.replace("BottomBar", {});
                } else {
                  dispatch(setLoginData([]));
                }
              });
            } else {
              dispatch(failureLogin(profileResult));
            }
          }
        } else {
          dispatch(failureLogin(result));
        }
      });
  };
}

export function resetLogin() {
  return async (dispatch) => {
    dispatch(resetLoginData());
  };
}

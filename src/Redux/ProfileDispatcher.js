import { initProfile, setProfileData, setProfileError } from "./ProfileAction";
import {
  storageKeys,
  DEFAULT_PROFILE_IMAGE,
} from "../Utilities/Constants/Constant";
import { saveDataToDB, getDataFromDB } from "../Storage/token";
import { endPoints, requestMethod } from "../Utilities/API/ApiConstants";
import { serverCall } from "..//Utilities/API";

export function fetchSavedProfileData() {
  return async (dispatch) => {
    dispatch(initProfile());
    getDataFromDB(storageKeys.PROFILE_DETAILS).then((result) => {
      if (result) {
        //result.data.data
        dispatch(setProfileData(result));
      } else {
        dispatch(setProfileError([]));
      }
    });
  };
}

export function updateProfileData(obj, userId) {
  return async (dispatch) => {
    dispatch(initProfile());
    let params = {
      firstName: obj.firstName,
      lastName: obj.lastName,
      gender: obj.gender,
      profilePicture: obj.profilePicture,
      address: {
        hno: obj.address.hno,
        buildingName: obj.address.buildingName,
        street: obj.address.street,
        road: obj.address.road,
        city: obj.address.city,
        state: obj.address.state,
        district: obj.address.district,
        country: obj.address.country,
        latitude: obj.address.latitude,
        longitude: obj.address.longitude,
        postCode: obj.address.postCode,
      },
    };

    let result = await serverCall(
      endPoints.UPDATE_MOBILE_USER + "/" + userId,
      requestMethod.PUT,
      params
    );

    if (result.success) {
      let profileParams = {};

      let profileResult = await serverCall(
        endPoints.PROFILE_DETAILS + "/" + userId,
        requestMethod.GET,
        profileParams
      );
      if (profileResult.success) {
        let profileData = {
          userId: profileResult?.data?.data?.userId ?? "",
          customerId: profileResult?.data?.data?.customerId ?? "",
          contactNo: profileResult?.data?.data?.contactNo ?? "",
          email: profileResult?.data?.data?.email ?? "",
          profilePicture:
            profileResult?.data?.data?.profilePicture ?? DEFAULT_PROFILE_IMAGE,
          title: profileResult?.data?.data?.title ?? "",
          firstName: profileResult?.data?.data?.firstName ?? "",
          lastName: profileResult?.data?.data?.lastName ?? "",
          gender: profileResult?.data?.data?.gender ?? "",
          dob: profileResult?.data?.data?.dob ?? "",
          officeNo: profileResult?.data?.data?.officeNo ?? "",
          extn: profileResult?.data?.data?.extn ?? "",
          status: profileResult?.data?.data?.status ?? "",
          location: profileResult?.data?.data?.location ?? "",
          hno: profileResult?.data?.data?.address?.hno ?? "",
          block: profileResult?.data?.data?.address?.block ?? "",
          buildingName: profileResult?.data?.data?.address?.buildingName ?? "",
          street: profileResult?.data?.data?.address?.street,
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
        //alert("address ************************"+JSON.stringify(profileData))
        await saveDataToDB(storageKeys.PROFILE_DETAILS, profileData);
        dispatch(setProfileData(profileData));
        // getDataFromDB(storageKeys.PROFILE_DETAILS).then((resultData) =>{
        //     if (resultData) {//result.data.data
        //         dispatch(setProfileData(result));
        //     } else{
        //         dispatch(setProfileError([]));
        //     }
        // });
      } else {
        dispatch(setProfileError([]));
      }
    } else {
      dispatch(setProfileError([]));
    }
  };
}

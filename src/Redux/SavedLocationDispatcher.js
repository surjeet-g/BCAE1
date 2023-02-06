import {
  initSavedLocation,
  setSavedLocation,
  savedLocationError,
  setAddressLoopUpData,
} from "./SavedLocationAction";
import { storageKeys } from "../Utilities/Constants/Constant";
import { saveDataToDB, getDataFromDB } from "../Storage/token";
import { endPoints, requestMethod } from "../../src/Utilities/API/ApiConstants";
import { serverCall } from "..//Utilities/API";

export function fetchSavedLocations(customerId) {
  return async (dispatch) => {
    dispatch(initSavedLocation());

    let params = {};
    let addressLookUpResult = await serverCall(
      endPoints.ADDRESS_LOOKUP,
      requestMethod.GET,
      params
    );
    console.log(
      "result.success outside :" + JSON.stringify(addressLookUpResult)
    );
    if (addressLookUpResult) {
      //result.data.data.
      dispatch(setAddressLoopUpData(addressLookUpResult?.data?.data));

      let params = {};
      let savedLocationResult = await serverCall(
        endPoints.GET_FAVOURITE_LOCATION + "/" + customerId,
        requestMethod.GET,
        params
      );
      if (savedLocationResult.success) {
        //result.data.data.rows
        dispatch(setSavedLocation(savedLocationResult?.data?.data?.rows));
      } else {
        dispatch(savedLocationError(savedLocationResult));
      }
    }
  };
}

export function addNewLocations(obj) {
  return async (dispatch) => {
    dispatch(initSavedLocation());
    let params = {
      customerId: obj.customerId,
      hno: obj.hno,
      buildingName: obj.buildingName,
      street: obj.street,
      road: obj.road,
      district: obj.district,
      state: obj.state,
      village: obj.village,
      cityTown: obj.cityTown,
      country: obj.country,
      latitude: obj.latitude,
      longitude: obj.longitude,
      postCode: obj.postCode,
    };

    let result = await serverCall(
      endPoints.ADD_FAVOURITE_LOCATION,
      requestMethod.POST,
      params
    );
    if (result.success) {
      //result.data.data.rows
      //console.log(getModifiedInteractions(DATA))
      dispatch(setSavedLocation(result));
    } else {
      dispatch(savedLocationError(result));
    }
  };
}

export function deleteSavedLocation(custFavAddrId, customerId) {
  return async (dispatch) => {
    dispatch(initSavedLocation());
    let params = {};
    console.log("=======custFavAddrId========>" + custFavAddrId);
    console.log("=======customerId========>" + customerId);
    let result = await serverCall(
      endPoints.GET_FAVOURITE_LOCATION + "/" + custFavAddrId,
      requestMethod.DELETE,
      params
    );
    if (result.success) {
      //result.data.data.rows
      //console.log(getModifiedInteractions(DATA))
      let result = await serverCall(
        endPoints.GET_FAVOURITE_LOCATION + "/" + customerId,
        requestMethod.GET,
        params
      );
      if (result.success) {
        //result.data.data.rows
        //console.log(getModifiedInteractions(DATA))
        dispatch(setSavedLocation(result.data.data.rows));
      } else {
        dispatch(savedLocationError(result));
      }
    } else {
      dispatch(savedLocationError(result));
    }
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

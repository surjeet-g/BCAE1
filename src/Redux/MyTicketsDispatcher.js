import {
  initMyTicketsData,
  setMyTicketsData,
  setMyTicketsError,
} from "./MyTicketsAction";
import { serverCall } from "..//Utilities/API";
import { endPoints, requestMethod } from "../../src/Utilities/API/ApiConstants";
import Geocoder from "@timwangdev/react-native-geocoder";
import { storageKeys } from "../Utilities/Constants/Constant";
import { getDataFromDB, saveDataToDB } from "../Storage/token";
import get from "lodash.get";

export function getMyTicketsData(cb = () => {}) {
  return async (dispatch) => {
    dispatch(initMyTicketsData());

    getDataFromDB(storageKeys.PROFILE_DETAILS)
      .then(function (profiledata) {
        return profiledata;
      })
      .then(async (profiledata) => {
        let params = {
          searchType: "ADV_SEARCH",
          customerName: "",
          serviceNumber: "",
          accountNumber: "",
          accountName: "",
          contactNumber: profiledata?.contactNo, //For now hardcoded 9834545592 for testing or else phoneNumber
          interactionId: "",
          filters: [],
        };

        let result = await serverCall(
          endPoints.MY_TICKETS_API,
          requestMethod.POST,
          params
        );
        if (result.success) {
          //result.data.data.rows
          cb();
          dispatch(setMyTicketsData(result.data.data.rows));
        } else {
          cb();
          dispatch(setMyTicketsError(result));
        }
      });
  };
}
export function resetMyTicketsData() {
  return async (dispatch) => {
    dispatch(setMyTicketsData([]));
  };
}

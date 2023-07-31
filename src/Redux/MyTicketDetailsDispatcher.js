import {
  initMyTicketDetailsData,
  setMyTicketDetailsData,
  setMyTicketDetailsError,
} from "./MyTicketDetailsAction";
import Geocoder from "@timwangdev/react-native-geocoder";
import { getDataFromDB, saveDataToDB } from "../Storage/token";
import get from "lodash.get";
import { GOOGLE_API_KEY, storageKeys } from "../Utilities/Constants/Constant";
import getGeoAddress from "../Utilities/Geocoder/index";
import { serverCall } from "..//Utilities/API";
import { endPoints, requestMethod } from "../../src/Utilities/API/ApiConstants";
/**
* Reducer Dispatch
* Handle API call for Fetch Interaction details for Top category and Recently Interaction
* @memberOf TicketDetails
* @param  {string} intxnId interaction ID
* @param  {string} intxnType interaction Type
* @returns {Object} Dispatcher to reducer
*/
export function getMyTicketDetailsData(intxnId, intxnType) {
  return async (dispatch) => {
    dispatch(initMyTicketDetailsData());
    let params = {};
    let result = await serverCall(
      endPoints.MY_TICKETS_DETAILS_API + "/" + intxnId + "?type=" + intxnType,
      requestMethod.GET,
      params
    );
    if (result.success) {
      mergeAddressInfo(result?.data?.data).then((data) => {
        dispatch(setMyTicketDetailsData(data));
      });

      //result.data.data
    } else {
      dispatch(setMyTicketDetailsError(result.data));
    }
  };
}

const mergeAddressInfo = async (rowData) => {
  if (rowData?.intxnId == null) return rowData;

  let addressString = "";

  if (rowData?.address?.hno) {
    addressString += rowData?.address?.hno + ",";
  }
  if (rowData?.address?.buildingName) {
    addressString += rowData?.address?.buildingName + ",";
  }
  if (rowData?.address?.street) {
    addressString += rowData?.address?.street + ",";
  }
  if (rowData?.address?.city) {
    addressString += rowData?.address?.city + ",";
  }
  if (rowData?.address?.district) {
    addressString += rowData?.address?.district + ",";
  }
  if (rowData?.address?.state) {
    addressString += rowData?.address?.state + ",";
  }
  if (rowData?.address?.country) {
    addressString += rowData?.address?.country + ",";
  } else {
    addressString += "Brunei";
  }

  if (rowData?.address?.postCode) {
    addressString += " " + rowData?.address?.postCode;
  } else {
    // rowData.address.postCode = "";
  }
  rowData.addressString = addressString;
  //if already having coordinate directly return value
  // rowData.latitude = 10.530345;
  // rowData.longitude = 76.214729;

  if (
    rowData?.address?.latitude != null &&
    rowData?.address?.longitude != null &&
    rowData?.address.latitude != "" &&
    rowData?.address?.longitude != ""
  ) {
    rowData.latitude = parseFloat(rowData?.address?.latitude);
    rowData.longitude = parseFloat(rowData?.address?.longitude);
    return rowData;
  }

  const localDB = await getDataFromDB(storageKeys.GEOCODER_DATA);
  const firstCall = localDB === "" || localDB == null;
  let hasGeocoderData = false;

  if (!firstCall && get(localDB, "length", false)) {
    const localAddreData = localDB.filter(
      (geo) => geo.addressString == addressString
    );
    if (localAddreData.length != 0) {
      hasGeocoderData = true;
      rowData.latitude = localAddreData[0].latitude;
      rowData.longitude = localAddreData[0].longitude;
    }
  }
  if (!hasGeocoderData) {
    getGeoAddress(rowData?.address?.postCode)
      .then((res) => {
        rowData.latitude = res[0]?.lat;
        rowData.longitude = res[0]?.lon;
      })
      .catch((err) => {
        rowData.latitude = parseFloat("4.5353");
        rowData.longitude = parseFloat("114.7277");
      });
  }

  await sleep(2000).then(() => { });

  return rowData;
};
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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
const DATA = [
  {
    intxnId: 29715,
    parentIntxn: null,
    subject: null,
    description: "Test",
    currStatus: "NEW",
    currUser: null,
    identificationNo: null,
    planId: null,
    assignedDate: "2022-08-25T23:23:12.975Z",
    intxnType: "REQCOMP",
    intxnCatType: "CATCOMP",
    businessEntityCode: "Prepaid",
    problemCode: "PROB0004493",
    natureCode: null,
    causeCode: null,
    clearCode: null,
    woType: "COMPLAINT",
    externalRefNo1: null,
    commentType: null,
    commentCause: "",
    priorityCode: "PR0002",
    createdEntity: "ORG0000001",
    currEntity: "ORG0000001",
    currRole: 1,
    customerId: 233197,
    accountId: null,
    addressId: 431048,
    sourceCode: "SRC003",
    chnlCode: "LIVECHAT",
    termType: null,
    slaCode: null,
    alertType: null,
    lastAlertDate: null,
    cntPrefer: "Email",
    assetId: null,
    uid: null,
    expctdDateCmpltn: null,
    isRebound: null,
    billAmt: null,
    isValid: null,
    arRefNo: null,
    refIntxnId: null,
    surveyReq: null,
    isBotReq: "N",
    botProcess: null,
    createdBy: "Admin IT",
    createdAt: "2022-08-26T07:23:12.976Z",
    updatedBy: null,
    updatedAt: "2022-08-26T07:23:12.976Z",
    connectionId: null,
    externalRefNo2: null,
    externalRefNo3: null,
    externalRefNo4: null,
    externalRefSys1: null,
    externalRefSys2: null,
    externalRefSys3: null,
    externalRefSys4: null,
    reasonCode: null,
    planIdList: null,
    kioskRefId: null,
    existingConnectionId: null,
    services: "STYP000077",
    terminateReason: null,
    refundDeposit: null,
    contractFeesWaiver: null,
    location: "LOCPM",
    billRefNo: null,
    helpdeskId: null,
    chatId: null,
    sevearity: null,
    about: null,
    problemType: null,
    problemCause: null,
    mappingPayload: null,
    forEntity: null,
    intxnCmplDate: null,
    intxnReferenceId: null,
    referenceCustId: null,
    currUsrRef: null,
    refModifiedBy: null,
    referenceAddrId: null,
    soId: null,
    currRoleName: "SUPERADMIN",
    intxnTypeDescription: "Complaint",
    aboutDescription: null,
    sourceDescription: "Customer",
    priorityDescription: "MEDIUM",
    commentCauseDescription: null,
    chnlDescription: "Live Chat",
    currStatusDescription: "New",
    ticketType: "Complaint",
    causeCodeDescription: null,
    categoryDescription: "Cleanliness",
    problemCodeDescription:
      "Restaurant Premises (food safety or food posioning)",
    typeDescription: null,
    sevearityDescription: null,
    locationDescription: "Headquaters",
    cntPreferDescription: null,
    problemTypeDescription: null,
    problemCauseDescription: null,
    createdEntityDesc: "Talian Darussalam",
    currEntityDesc: "Talian Darussalam",
    roleDesc: "SUPERADMIN",
    userName: " ",
    realTimeDetails: {},
    latestAppointment: null,
  },
];

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

  await sleep(2000).then(() => {});

  return rowData;
};
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

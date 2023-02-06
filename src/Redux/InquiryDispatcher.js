import { serverCall } from "..//Utilities/API";
import { endPoints, requestMethod } from "../../src/Utilities/API/ApiConstants";
import {
  failureFetchDetailsData,
  initFetchDetailsData,
  initInquiryData,
  setFetchDetailsData,
  setInquiryData,
  setInquiryError,
  resetInquiryData,
  setProblemFetchDetailsData,
  setFetchOrganizationsData,
} from "./InquiryAction";
import { getDataFromDB } from "../Storage/token";
import { storageKeys, TDLog } from "../Utilities/Constants/Constant";

export function createInquiry(obj, resetAllStateData) {
  return async (dispatch) => {
    dispatch(initInquiryData());
    TDLog(" createInquiry JSON.stringify(obj)", JSON.stringify(obj));
    let resultAttachment = [];
    let params = [];

    obj?.fileAttachments.forEach(async (file) => {
      params = [
        ...params,
        {
          fileName: file.fileName,
          fileType: file.fileType,
          entityType: obj.intxnType === "REQCOMP" ? "COMPLAINT" : "INQUIRY",
          content: "data:" + file.fileType + ";" + file.base64,
        },
      ];
    });
    TDLog("attachment params=============>", JSON.stringify(params));

    const result = await serverCall(
      endPoints.UPLOAD_ATTACHMENT,
      requestMethod.POST,
      params
    );
    if (result?.success && result?.data) {
      TDLog(
        " uploadAttachment success",
        JSON.stringify(result?.data?.data[0]?.entityId)
      );
      //populating attachment list
      result?.data?.data?.map((data) => {
        resultAttachment.push(data?.entityId);
      });

      TDLog(" resultAttachment ", JSON.stringify(resultAttachment));

      getDataFromDB(storageKeys.PROFILE_DETAILS)
        .then(function (profiledata) {
          return profiledata;
        })
        .then(async (profiledata) => {
          let params = {};
          if (obj.intxnType == "REQINQ") {
            //// Params for Inquiry
            params = {
              customerId: profiledata.customerId,
              customerDetails: {
                customerName:
                  profiledata.firstName + " " + profiledata.lastName,
                customerType: "RESIDENTIAL",
                email: profiledata.email,
                contactPreference: obj.contactPreference,
                contactNbr: profiledata.contactNo,
              },
              intxnType: obj.intxnType,
              kioskRefId: null,
              attachments: resultAttachment,
              location: "",
              serviceType: obj.serviceType,
              productOrServices: obj.problem,
              inquiryCategory: obj.problem,
              ticketPriority: "PR0003",
              ticketChannel: "MOBILEAPP",
              ticketSource: "SRCACCTOWNER",
              problemCause: "",
              status: "NEW",
              ticketDescription: obj.ticketDescription,
              newInquiryData: {
                serviceType: obj.serviceType,
                productOrServices: obj.problem,
                inquiryCategory: obj.problem,
                ticketPriority: "PR0003",
                ticketChannel: "MOBILEAPP",
                ticketSource: "SRCACCTOWNER",
                problemCause: "",
                status: "NEW",
                ticketDescription: obj.ticketDescription,
                customerId: profiledata.customerId,
                kioskRefId: null,
                location: "",
                toEntity: obj.deptID,
                toOu: getOUData(profiledata.currDeptId),
                attachments: resultAttachment,
              },
              personalInquireData: {
                customerName:
                  profiledata.firstName + " " + profiledata.lastName,
                customerType: "RESIDENTIAL",
                email: profiledata.email,
                contactPreference: obj.contactPreference,
                contactNbr: profiledata.contactNo,
              },
              sameAsCustomerAddress: false,
              isExsitingCustomer: true,
              toEntity: obj.deptID,
            };
          } else {
            // Params for Complaint
            params = {
              customerId: profiledata.customerId,
              problemCode: obj.problem,
              chnlCode: "MOBILEAPP",
              sourceCode: "SRCACCTOWNER",
              priorityCode: "PR0003",
              cntPrefer: obj.contactPreference,
              remarks: obj.ticketDescription,
              intxnType: obj.intxnType,
              kioskRefId: null,
              attachments: resultAttachment,
              ticketType: obj.intxnType,
              productOrServices: obj.serviceType,
              serviceType: obj.serviceType,
              masterTicketId: "",
              addressData: {
                addressType: true,
                addressId: "", //to check
                flatHouseUnitNo: obj.flatHouseUnitNo,
                building: obj.building,
                street: obj.street,
                district: obj.district,
                state: obj.state,
                cityTown: obj.cityTown,
                country: obj.country,
                postCode: obj.postCode,
                latitude: obj.latitude,
                longitude: obj.longitude,
              },
              toEntity: obj.deptID,
              toOu: getOUData(profiledata.currDeptId),
            };
          }
          TDLog("complaint params=============>", JSON.stringify(params));

          let result = await serverCall(
            obj.intxnType === "REQINQ"
              ? endPoints.CREATE_INQUIRY
              : endPoints.CREATE_COMPLAINT,
            requestMethod.POST,
            params
          );
          if (result.success) {
            resetAllStateData();
            //result.data.data.rows
            TDLog(
              "hit Create enquiry api====>",
              JSON.stringify(result.data.data)
            );
            dispatch(setInquiryData(result.data.data));
          } else {
            dispatch(setInquiryError(result));
          }
        });
    } else {
      TDLog(" resultAttachment error", JSON.stringify(result));
      dispatch(setInquiryError(result));
    }
  };
}

export function fetchDetailsData(type = "initial") {
  return async (dispatch) => {
    dispatch(initFetchDetailsData());
    let params;
    if (type == "ORGANIZATION") {
      params = {};
    } else if (type == "PROBLEM_CODE") {
      params = ["PROBLEM_CODE"];
    } else {
      params = ["INTXN_TYPE", "PROD_TYPE"];
    }

    let url;
    let method;
    if (type == "ORGANIZATION") {
      url = endPoints.ORGANIZATION;
      method = requestMethod.GET;
    } else if (type == "PROBLEM_CODE" || type == "initial") {
      url = endPoints.GET_REGISTER_FORM_DATA;
      method = requestMethod.POST;
    }

    let result = await serverCall(url, method, params);

    if (result.success && result?.data) {
      if (type == "ORGANIZATION") {
        dispatch(setFetchOrganizationsData(result.data));
      } else if (type == "PROBLEM_CODE") {
        dispatch(setProblemFetchDetailsData(result.data));
      } else {
        dispatch(setFetchDetailsData(result.data));
      }
    } else {
      dispatch(failureFetchDetailsData(result));
    }
  };
}

export function uploadAttachment(params) {
  return new Promise((resolve) => {
    let result = serverCall(
      endPoints.UPLOAD_ATTACHMENT,
      requestMethod.POST,
      params
    );
    if (result.success && result?.data) {
      console.log(
        "result====>uploadAttachment==2>" + JSON.stringify(result?.data)
      );
      return result.data;
    } else {
      console.log("result====>uploadAttachment==3>" + JSON.stringify(result));

      return false;
    }
  });
}

export function resetInquiry() {
  return async (dispatch) => {
    dispatch(resetInquiryData());
  };
}

const getOUData = (currDeptId) => {
  if (currDeptId == undefined) return "";
  const myArray = currDeptId.split(".");
  if (myArray.length === 3) {
    return myArray[1] + "." + myArray[2];
  } else if (myArray.length === 2) {
    return myArray[1];
  }
};

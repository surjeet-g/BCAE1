import {
  initInquiryNotificationsData,
  setInquiryNotificationsData,
  setInquiryNotificationsError,
} from "./InquiryNotificationsAction";
import { serverCall } from "../Utilities/API";
import { endPoints, requestMethod } from "../../src/Utilities/API/ApiConstants";
import { getDataFromDB } from "../Storage/token";
import { storageKeys } from "../Utilities/Constants/Constant";

export function getInquiryNotificationsData(
  ouId,
  serviceType,
  problemCode,
  deptId
) {
  return async (dispatch) => {
    dispatch(initInquiryNotificationsData());
    let params = {
      ouId: ouId,
      serviceType: serviceType,
      problemCode: problemCode,
      deptId: deptId,
      intxnType: "REQINQ",
    };

    let result = await serverCall(
      `${endPoints.INQUIRY_NOTIFICATIONS}`,
      requestMethod.POST,
      params
    );
    if (result.success) {
      //result.data.row
      dispatch(setInquiryNotificationsData(result.data.data));
    } else {
      dispatch(setInquiryNotificationsError(result));
    }
  };
}

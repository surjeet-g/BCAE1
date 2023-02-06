import {
  initFollowUpData,
  setInsertFollowUpData,
  setInsertFollowUpError,
  setFollowUpWithAtttachmentData,
  setFollowUpWithAtttachmentError,
  setFollowUpData,
  setFollowUpError,
} from "./FollowUpAction";
import Toast from "react-native-toast-message";

import { serverCall } from "../Utilities/API";
import { endPoints, requestMethod } from "../../src/Utilities/API/ApiConstants";
import get from "lodash.get";
const DATA = [
  {
    txnId: 721074,
    intxnId: 29753,
    fromEntity: "DPT0000682.OPU0000003.ORG0000001",
    fromRole: 25,
    fromUser: null,
    toEntity: "DPT0000682.OPU0000003.ORG0000001",
    toRole: 25,
    toUser: null,
    intxnStatus: "CLOSED",
    flwId: "1",
    flwCreatedAt: "2022-09-21T05:01:33.294Z",
    flwCreatedBy: "vipin v",
    flwAction: "CREATED TICKET",
    priorityCode: "PR0001",
    businessEntityCode: null,
    problemCode: null,
    natureCode: null,
    causeCode: null,
    isFlwBypssd: null,
    slaCode: "SRC003",
    expctdDateCmpltn: null,
    remarks: "Test Low",
    isFollowup: "Y",
    fromUsrRef: null,
    toUsrRef: null,
    intxnTxnReferenceId: null,
    wkFlwRefrenceId: null,
    intxnReferenceId: null,
    oldIntxnStatus: null,
    departmentDescription: "OnlineJPD",
    roleDescription: "LEVEL1",
    sourceDescription: "Customer",
  },
];
const EMPTY_DATA = [];
export function getFollowUpData(id, type) {
  return async (dispatch) => {
    dispatch(initFollowUpData());
    let params = {};
    let result = await serverCall(
      `${endPoints.GETFOLLOWUPWITHATTTACHMENT}/${id}?type=${type}`,
      requestMethod.GET,
      params
    );

    if (result.success) {
      dispatch(setFollowUpData(result?.data?.data));
    } else {
      dispatch(setFollowUpError([]));
    }
  };
}
export function getFollowUpWithAtttachmentData(id, type) {
  return async (dispatch) => {
    dispatch(initFollowUpData());

    let params = {};
    let result = await serverCall(
      `${endPoints.GETFOLLOWUPWITHATTTACHMENT}/${id}`,
      requestMethod.GET,
      params
    );

    if (result.success) {
      let formatedData = [];
      const followUpData = result.data?.data;
      if (get(followUpData, "length", false)) {
        await Promise.all(
          followUpData.map(async (followUp) => {
            const attachmentRes = await serverCall(
              `${endPoints.UPLOAD_ATTACHMENT}?entity-id=${followUp.txnId}&entity-type=${type}`,
              requestMethod.GET,
              params
            );
            if (attachmentRes.success)
              formatedData.push({
                ...followUp,
                ...{ attachments: get(attachmentRes, "data.data") },
              });
          })
        );
      }
      dispatch(setFollowUpWithAtttachmentData(formatedData));
    } else {
      dispatch(setFollowUpWithAtttachmentError(result?.data));
    }
  };
}

export function InsertFollowUpData(data, followUpData, callbackAction) {
  return async (dispatch) => {
    let params = {
      priorityCode: "PR0001",
      slaCode: "SRC003",
      remarks: followUpData.description,
      intxnStatus: "NEW",
      intxnId: followUpData.intxnId,
      attachments: data,
    };

    let result = await serverCall(
      endPoints.INSERTFOLLOWUP,
      requestMethod.POST,
      params
    );
    if (result.success) {
      Toast.show({
        type: "bctSuccess",
        text1: result?.message || "Sucessfully created followup",
      });
      callbackAction("success");
      // dispatch(setInsertFollowUpData());
    } else {
      Toast.show({
        type: "bctError",
        text1: result?.message,
      });
      callbackAction("error");

      dispatch(setInsertFollowUpError(result));
    }
  };
}

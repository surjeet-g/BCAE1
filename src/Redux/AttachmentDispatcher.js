import {
  initAttachmentData,
  setAttachmentData,
  setAttachmentError,
  initAttachmentUploadData,
  setAttachmentUploadData,
  setAttachmentUploadError,
} from "./AttachmentAction";
import { serverCall } from "../Utilities/API";
import { endPoints, requestMethod } from "../../src/Utilities/API/ApiConstants";
const EMPTY_DATA = [];
const DATA = [];
import get from "lodash.get";

export function getAttachmentData(id, type) {
  type = type === "REQCOMP" ? "COMPLAINT" : "INQUIRY";
  return async (dispatch) => {
    dispatch(initAttachmentData());
    let params = {};
    let result = await serverCall(
      `${endPoints.UPLOAD_ATTACHMENT}?entity-id=${id}&entity-type=${type}`,
      requestMethod.GET,
      params
    );
    if (result.success) {
      let formatedData = [];
      const attachmentInfo = result.data?.data;
      if (get(attachmentInfo, "length", false)) {
        await Promise.all(
          attachmentInfo.map(async (attachmentObj) => {
            console.log("point 1", attachmentObj);
            const attachmentRes = await serverCall(
              `${endPoints.UPLOAD_ATTACHMENT}/${attachmentObj?.attachmentId}?entity-id=${id}&entity-type=${type}`,
              requestMethod.GET,
              params
            );
            console.log("point 3", attachmentRes);
            if (attachmentRes.success)
              formatedData.push({
                ...attachmentObj,
                ...{ base64: get(attachmentRes, "data.data.content", "") },
              });
          })
        );
      }

      dispatch(setAttachmentData(formatedData));
    } else {
      dispatch(setAttachmentError(DATA));
    }
  };
}

export function uploadAttachmentData(
  params,
  followUpForm,
  uploadFollowup,
  successCallback
) {
  return async (dispatch) => {
    dispatch(initAttachmentUploadData());
    const result = await serverCall(
      endPoints.UPLOAD_ATTACHMENT,
      requestMethod.POST,
      params
    );
    let Ids = [];
    if (result?.success && result?.data) {
      const uploadIds = result?.data?.data;
      console.log("point follow", uploadIds);
      if (get(uploadIds, "length", false)) {
        Ids = uploadIds.map((id) => id.entityId);
      }
      console.log("point attachment", Ids);
      await uploadFollowup(Ids, followUpForm, successCallback);
    } else {
      await uploadFollowup([], followUpForm, successCallback);
      await dispatch(setAttachmentUploadError(DATA));
    }
  };
}

export function clearUploadAttachmentArr() {
  return async (dispatch) => {
    dispatch(initAttachmentUploadData());
  };
}

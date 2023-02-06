export const INQUIRY_INIT = "INQUIRY_INIT";
export const INQUIRY_DATA = "INQUIRY_DATA";
export const INQUIRY_ERROR = "INQUIRY_ERROR";

export const INIT_FETCH_DETAILS = "INIT_FETCH_DETAILS";
export const SET_FETCH_DETAILS = "SET_FETCH_DETAILS";
export const SET_PROBLEM_FETCH_DETAILS = "SET_PROBLEM_FETCH_DETAILS";
export const SET_ORGANIZATION_FETCH_DETAILS = "SET_ORGANIZATION_FETCH_DETAILS";
export const FAILURE_FETCH_DETAILS = "FAILURE_FETCH_DETAILS";
export const RESET_INQUIRY_DATA = "RESET_INQUIRY_DATA";

export function initFetchDetailsData() {
  return { type: INIT_FETCH_DETAILS };
}
export function setProblemFetchDetailsData(data) {
  return { type: SET_PROBLEM_FETCH_DETAILS, data };
}
export function setFetchOrganizationsData(data) {
  return { type: SET_ORGANIZATION_FETCH_DETAILS, data };
}
export function setFetchDetailsData(data) {
  return { type: SET_FETCH_DETAILS, data };
}
export function failureFetchDetailsData(data) {
  return { type: FAILURE_FETCH_DETAILS, data };
}

export function initInquiryData() {
  return { type: INQUIRY_INIT };
}

export function setInquiryData(data) {
  return { type: INQUIRY_DATA, data };
}

export function setInquiryError(data) {
  return { type: INQUIRY_ERROR, data };
}

export function resetInquiryData() {
  return { type: RESET_INQUIRY_DATA };
}

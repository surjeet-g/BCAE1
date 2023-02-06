//Staging environment
//export const BASE_URL = 'https://bcae-test.comquest-brunei.com:1443/bcae/';
export const BASE_URL = "https://st-td123.comquest-brunei.com:13443/td123/";

export const BASE_URL_TENANT =
  "https://bcae-test.comquest-brunei.com:1443/tenant/";

export const PROD_BASE_URL = "https://123.comquest-brunei.com/NCC/";

export const PROD_BASE_URL_TENANT =
  "https://bcae-prod.comquest-brunei.com:19443/tenant/";

export const endPoints = {
  NOTIFICATIONS: "api/notification/pushNotification",
  ANNOUNCEMENT: "api/announcement",
  INSERTFOLLOWUP: "api/interaction/followUp",
  GETFOLLOWUPWITHATTTACHMENT: "api/interaction/followUp",
  FOLLOWUP: "api/complaint",
  USER_LOGIN: "api/bcae-tenant",
  GET_REGISTER_FORM_DATA: "api/lookup/business-entity",
  MY_TICKETS_API: "api/interaction/search",
  MY_TICKETS_DETAILS_API: "api/complaint",
  GET_OTP_FOR_MOBILE: "api/users/send-otp?type=mobile&source=REGISTER",
  GET_OTP_FOR_EMAIL: "api/users/send-otp?type=email&source=REGISTER",
  CHECK_OTP: "api/users/verify-otp/",
  FORGOT_PASSWORD: "api/users/send-forgot-password",
  PROFILE_DETAILS: "api/users",
  UPDATE_MOBILE_USER: "api/users/update",
  REGISTER: "api/bcae-tenant/register",
  GET_FAVOURITE_LOCATION: "api/customer/customer-favorite-address",
  ADD_FAVOURITE_LOCATION: "api/customer/customer-favorite-address",
  DELETE_FAVOURITE_LOCATION: "api/customer/customer-favorite-address",
  CREATE_INQUIRY: "api/inquiry",
  CREATE_COMPLAINT: "api/complaint",
  CHANGE_PASSWORD: "api/users/reset-password/mobile",
  UPLOAD_ATTACHMENT: "api/attachment",
  LOGOUT_USER: "api/users/logout/mobile",
  DELETE_ACCOUNT: "api/users/deactivate",
  REFRESH_TOKEN: "api/users/refresh-token",
  INQUIRY_NOTIFICATIONS: "api/KnowledgeBase/inquiry-notification",
  ORGANIZATION: "api/organization",
  ADDRESS_LOOKUP: "api/lookup/address-lookup",
  ADDRESS_LOOKUP_REGISTRATION: "api/users/address-lookup",
};

export const requestMethod = {
  GET: "GET",
  DELETE: "DELETE",
  HEAD: "HEAD",
  OPTIONS: "OPTIONS",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  LINK: "LINK",
  UNLINK: "UNLINK",
};

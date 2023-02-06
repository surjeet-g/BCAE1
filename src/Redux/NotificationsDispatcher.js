import {
  initNotificationsData,
  setNotificationsData,
  setNotificationsError,
} from "./NotificationsAction";
import { serverCall } from "../Utilities/API";
import { endPoints, requestMethod } from "../../src/Utilities/API/ApiConstants";
import { getDataFromDB } from "../Storage/token";
import { storageKeys } from "../Utilities/Constants/Constant";
const EMPTY_DATA = [];
const DATA = [
  {
    notificationId: 2757,

    source: "Complaint",

    referenceId: 240509,

    isViewed: "N",

    createdAt: "2022-11-05T07:15:23.616Z",

    subject:
      "Ticket ID #240509 created in system and assigned to your department",

    body: '\n    <p>Dear User,\n    <br/>A ticket has been created and assigned to your department and its available in your dashboard.\n    <br/>\n    </p>\n    <table style="border: 1px solid; width:80%"><thead>\n      <tr>\n        <th style="border: 1px solid;">TICKET ID</th>\n        <th style="border: 1px solid;">TICKET DESCRIPTION</th>\n\t\t\t\t<th style="border: 1px solid;">ASSIGNED TO</th>\n        <th style="border: 1px solid;">SERVICE TYPE</th>\n        <th style="border: 1px solid;">PROBLEM CODE</th>\n\t\t\t\t<th style="border: 1px solid;">STATUS</th>\n        <th style="border: 1px solid;">PRIORITY</th>\n        <th style="border: 1px solid;">CUSTOMER NAME</th>\n        <th style="border: 1px solid;">PRIMARY CONTACT</th>\n        </tr></thead>\n\t\t\t\t<tbody><tr>\n        <td style="border: 1px solid;">240509</td>\n        <td style="border: 1px solid;">J19-Jalan RIPAS / RIPAS Hospital (Flyover)</td>\n        <td style="border: 1px solid;">DOR-Traffic Lights</td>\n\t\t\t\t<td style="border: 1px solid;">Public Grievance</td>\n        <td style="border: 1px solid;">Traffic Light Malfunction</td>\n        <td style="border: 1px solid;">New</td>\n        <td style="border: 1px solid;">HIGH</td>\n        <td style="border: 1px solid;">KAVIYA SENTHILKUMAR T</td>\n        <td style="border: 1px solid;">8264253</td>\n        </tr></tbody>\n\t\t\t\t</table>\n        <p>\n        <br/>Regards, \n        <br/>Talian Darussalam 123 \n        <br/>\n        <br/>Note:\n        <br/>This is an auto generated mail. Please do not reply to this mail. \n        </p>\n        ',

    customerId: 53583,
  },
  {
    notificationId: 2757,

    source: "Complaint",

    referenceId: 240509,

    isViewed: "N",

    createdAt: "2022-10-05T07:15:23.616Z",

    subject:
      "Ticket ID #240509 created in system and assigned to your department",

    body: '\n    <p>Dear User,\n    <br/>A ticket has been created and assigned to your department and its available in your dashboard.\n    <br/>\n    </p>\n    <table style="border: 1px solid; width:80%"><thead>\n      <tr>\n        <th style="border: 1px solid;">TICKET ID</th>\n        <th style="border: 1px solid;">TICKET DESCRIPTION</th>\n\t\t\t\t<th style="border: 1px solid;">ASSIGNED TO</th>\n        <th style="border: 1px solid;">SERVICE TYPE</th>\n        <th style="border: 1px solid;">PROBLEM CODE</th>\n\t\t\t\t<th style="border: 1px solid;">STATUS</th>\n        <th style="border: 1px solid;">PRIORITY</th>\n        <th style="border: 1px solid;">CUSTOMER NAME</th>\n        <th style="border: 1px solid;">PRIMARY CONTACT</th>\n        </tr></thead>\n\t\t\t\t<tbody><tr>\n        <td style="border: 1px solid;">240509</td>\n        <td style="border: 1px solid;">J19-Jalan RIPAS / RIPAS Hospital (Flyover)</td>\n        <td style="border: 1px solid;">DOR-Traffic Lights</td>\n\t\t\t\t<td style="border: 1px solid;">Public Grievance</td>\n        <td style="border: 1px solid;">Traffic Light Malfunction</td>\n        <td style="border: 1px solid;">New</td>\n        <td style="border: 1px solid;">HIGH</td>\n        <td style="border: 1px solid;">KAVIYA SENTHILKUMAR T</td>\n        <td style="border: 1px solid;">8264253</td>\n        </tr></tbody>\n\t\t\t\t</table>\n        <p>\n        <br/>Regards, \n        <br/>Talian Darussalam 123 \n        <br/>\n        <br/>Note:\n        <br/>This is an auto generated mail. Please do not reply to this mail. \n        </p>\n        ',

    customerId: 53583,
  },
];

export function getNotificationsData() {
  return async (dispatch) => {
    const userInfo = await getDataFromDB(storageKeys.PROFILE_DETAILS);
    dispatch(initNotificationsData());

    let params = {};

    let result = await serverCall(
      `${endPoints.NOTIFICATIONS}/${userInfo.customerId}`,
      requestMethod.GET,
      params
    );
    if (result.success) {
      //result.data.row
      //read api trigger
      try {
        await serverCall(
          `${endPoints.NOTIFICATIONS}/${userInfo.customerId}`,
          requestMethod.PUT,
          params
        );
      } catch (err) {}
      dispatch(setNotificationsData(result.data.data.rows));
    } else {
      dispatch(setNotificationsError(result));
    }
  };
}

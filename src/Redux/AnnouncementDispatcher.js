import {
  initAnnouncementsData,
  setAnnouncementsData,
  setAnnouncementsError,
} from "./AnnouncementAction";
import { storageKeys } from "../Utilities/Constants/Constant";
import { getDataFromDB, saveDataToDB } from "../Storage/token";
import { serverCall } from "..//Utilities/API";
import { endPoints, requestMethod } from "../../src/Utilities/API/ApiConstants";
import get from "lodash.get";

export function getAnnouncementsData(navigation, phoneNumber) {
  return async (dispatch) => {
    dispatch(initAnnouncementsData());
    let params = {};
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
        //annouch api call
        let result = await serverCall(
          endPoints.ANNOUNCEMENT,
          requestMethod.GET,
          params
        );
        if (result.success) {
          //result.data.data.rows
          let fullAnnouncement = [];
          const masterInteraction = await getAllMasterIntraction(params);
          console.log(
            "master intraction data main dispatcher",
            masterInteraction
          );

          const annonceData = get(result, "data.data", []);
          console.log("annoucment dispatcher annoument data", annonceData);

          if (annonceData.length != 0) {
            console.log("announment having data ");
            fullAnnouncement.push(annonceData);
          }

          if (masterInteraction.length != 0) {
            masterInteraction.map((masterD) => {
              fullAnnouncement.push({
                announName: masterD.title,
                createdAt: masterD.createdAt,
                announMsg: masterD.description,
              });
              return;
            });
          }
          console.log("after push to main array data", fullAnnouncement);
          let sortedData = [];
          if (fullAnnouncement.length != 0) {
            sortedData = fullAnnouncement.sort(function (a, b) {
              // Turn your strings into dates, and then subtract them
              // to get a value that is either negative, positive, or zero.
              return new Date(b.createdAt) - new Date(a.createdAt);
            });
          }

          dispatch(setAnnouncementsData(sortedData));
        } else {
          dispatch(setAnnouncementsData(result));
        }
      });
  };
}

const getAllMasterIntraction = async (params) => {
  try {
    let result = await serverCall(
      `${endPoints.MY_TICKETS_API}`,
      requestMethod.POST,
      params
    );
    if (result.success) {
      console.log("getAllMasterIntraction() API Req success");
      const masterInt = get(result, "data.data.masterTicket.rows", []);
      console.log("master intrac get method parse array ", masterInt);
      return masterInt;
    } else {
      console.log(
        "getAllMasterIntraction() API Req failed else case return []"
      );
      return [];
    }
  } catch (error) {
    console.log("getting error fetch master intraction data");
    return [];
  }
};

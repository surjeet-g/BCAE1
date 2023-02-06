import {
  initMyDashboardData,
  setMyDashboardData,
  setMyDashboardError,
} from "./MyDashboardAction";
import { serverCall } from "..//Utilities/API";
import { endPoints, requestMethod } from "../../src/Utilities/API/ApiConstants";
import Geocoder from "@timwangdev/react-native-geocoder";
import { GOOGLE_API_KEY, storageKeys } from "../Utilities/Constants/Constant";
import { getDataFromDB, saveDataToDB } from "../Storage/token";
import { Platform } from "react-native";
import getGeoAddress from "../Utilities/Geocoder/index";

import get from "lodash.get";

export function getMyDashboardData(page = 0) {
  return async (dispatch) => {
    if (page === 0) dispatch(initMyDashboardData());
    saveDashboardData(dispatch, page);
  };
}

const getModifiedInteractions = async (dataBeforeModification) => {
  var dataAfterModification = [];
  if (dataBeforeModification.length > 0) {
    await Promise.all(
      dataBeforeModification.map(async (data, _) => {
        //already having coordinate for records

        if (
          data.latitude != null &&
          data.longitude != null &&
          data.latitude != "" &&
          data.longitude != ""
        ) {
          data.latitude = parseFloat(data.latitude);
          data.longitude = parseFloat(data.longitude);
          dataAfterModification.push(data);
        } else {
          // console.warn("entering console map");

          try {
            data.latitude = null;
            data.longitude = null;
            let addressString = "";

            if (data?.houseNo) {
              addressString += data.houseNo + ",";
            }
            if (data?.block) {
              addressString += data.block + ",";
            }
            if (data?.buildingName) {
              addressString += data.buildingName + ",";
            }
            if (data?.street) {
              addressString += data.street + ",";
            }
            if (data?.town) {
              addressString += data.town + ",";
            }
            if (data?.city) {
              addressString += data.city + ",";
            }
            if (data?.district) {
              addressString += data.district + ",";
            }
            if (data?.state) {
              addressString += data.state + ",";
            }
            if (data?.country) {
              addressString += data.country + ",";
            } else {
              addressString += "Brunei";
            }

            if (data?.postCode) {
              addressString += " " + data.postCode;
            } else {
              data.postCode = "BB3713";
            }
            let hasGeocoderData = false;

            let localDB;
            try {
              localDB = await getDataFromDB(storageKeys.GEOCODER_DATA);
            } catch (error) {}

            const firstCall = localDB == "" || localDB == null;
            let localAddreData = [];
            //local db having data in local strorage
            if (!firstCall && get(localDB, "length", false)) {
              localAddreData = localDB.filter(
                (geo) => geo.addressString == data.postCode
              );
              //checking the current address string in localdb
              if (localAddreData.length != 0) {
                hasGeocoderData = true;
                data.latitude = localAddreData[0].latitude;
                data.longitude = localAddreData[0].longitude;
                dataAfterModification.push(data);
              }
            }
            //data is empty in local db get data from gecoder
            if (get(localAddreData, "length", 0) == 0) {
              // console.warn("entering gecoder data", addressString);
              //todo platform
              await getGeoAddress(data?.postCode)
                .then(async (res) => {
                  data.latitude = res[0].lat;
                  data.longitude = res[0].lon;
                  console.warn("res from", res[0].lat);
                  dataAfterModification.push(data);
                  const coords = {
                    latitude: res[0].lat,
                    longitude: res[0].lon,
                    addressString: data?.postCode,
                  };
                  // console.warn("gecoder success ", res[0].lat);
                  if (firstCall) {
                    await saveDataToDB(storageKeys.GEOCODER_DATA, [
                      {
                        latitude: res[0].lat,
                        longitude: res[0].lon,
                        addressString: data?.postCode,
                      },
                    ]);
                  } else {
                    await saveDataToDB(storageKeys.GEOCODER_DATA, [
                      ...localDB,
                      coords,
                    ]);
                  }
                  //console.warn("dataAfterModification =========>"+dataAfterModification)
                  // return;
                })
                .catch((err) => {
                  console.warn("gecoder errr", err);
                  data.latitude = "4.5353";
                  data.longitude = "114.7277";
                  dataAfterModification.push(data);
                  // return;
                });
            }
          } catch (error) {
            console.log("err");
            // return;
          }
          //end of check of data exist or not
        }
        // return null;
      })
    );
  }

  console.log("data after modification", dataAfterModification);
  return dataAfterModification;
};

const getModifiedMasterTickets = async (rowData, masterTicketDataList) => {
  if (masterTicketDataList.length > 0) {
    await Promise.all(
      masterTicketDataList.map(async (masterTicketData, _) => {
        if (
          masterTicketData.latitude != null &&
          masterTicketData.longitude != null &&
          masterTicketData.latitude != "" &&
          masterTicketData.longitude != ""
        ) {
          masterTicketData.latitude = parseFloat(masterTicketData.latitude);
          masterTicketData.longitude = parseFloat(masterTicketData.longitude);
          const mastrData = createObjMasterData(
            masterTicketData,
            masterTicketData.latitude,
            masterTicketData.longitude
          );
          rowData.push(mastrData);
        } else {
          try {
            masterTicketData.latitude = null;
            masterTicketData.longitude = null;
            let addressString = "";

            if (masterTicketData.address?.hno) {
              addressString += masterTicketData.address.hno + ",";
            }
            if (masterTicketData.address?.buildingName) {
              addressString += masterTicketData.address.buildingName + ",";
            }
            if (masterTicketData.address?.street) {
              addressString += masterTicketData.address.street + ",";
            }
            if (masterTicketData.address?.city) {
              addressString += masterTicketData.address.city + ",";
            }
            if (masterTicketData.address?.district) {
              addressString += masterTicketData.address.district + ",";
            }
            if (masterTicketData.address?.state) {
              addressString += masterTicketData.address.state + ",";
            }
            if (masterTicketData.address?.country) {
              addressString += masterTicketData?.address.country + ",";
            } else {
              addressString += "Brunei";
            }

            if (masterTicketData.address?.postCode) {
              addressString += " " + masterTicketData.address.postCode;
            } else {
              masterTicketData.address.postCode = "BB3713";
            }
            let hasGeocoderData = false;
            let localDB;
            try {
              localDB = await getDataFromDB(storageKeys.GEOCODER_DATA);
            } catch (error) {
              // console.warn("err handle localdb", error);
            }
            const firstCall = localDB === "" || localDB == null;
            let localAddreData = [];

            if (!firstCall && get(localDB, "length", false)) {
              // console.warn("entering first call");
              localAddreData = localDB.filter(
                (geo) => geo.addressString == masterTicketData.address.postCode
              );

              if (localAddreData.length != 0) {
                hasGeocoderData = true;
                const masterTicketLatitude = localAddreData[0].latitude;
                const masterTicketLongitude = localAddreData[0].longitude;

                const masterDataLocal = createObjMasterData(
                  masterTicketData,
                  masterTicketLatitude,
                  masterTicketLongitude
                );
                rowData.push(masterDataLocal);
              }
            }

            if (get(localAddreData, "length", 0) == 0) {
              // console.warn("entering into gecoder lib");
              await getGeoAddress(masterTicketData?.address?.postCode)
                .then(async (res) => {
                  console.warn(
                    "response",
                    masterTicketData?.address?.postCode,
                    res
                  );
                  const masterTicketLatitude = res[0].lat;
                  const masterTicketLongitude = res[0].lon;

                  const coords = {
                    latitude: res[0].lat,
                    longitude: res[0].lon,
                    addressString: masterTicketData?.address?.postCode,
                  };
                  if (firstCall) {
                    await saveDataToDB(storageKeys.GEOCODER_DATA, [
                      {
                        latitude: res[0].lat,
                        longitude: res[0].lon,
                        addressString: masterTicketData?.address?.postCode,
                      },
                    ]);
                  } else {
                    await saveDataToDB(storageKeys.GEOCODER_DATA, [
                      ...localDB,
                      coords,
                    ]);
                  }
                  const masterData = createObjMasterData(
                    masterTicketData,
                    masterTicketLatitude,
                    masterTicketLongitude
                  );

                  rowData.push(masterData);
                  return;
                  //console.warn("dataAfterModification =========>"+dataAfterModification)
                })
                .catch((err) => {
                  console.warn("err fetching gecoder", err);
                  const masterData = createObjMasterData(
                    masterTicketData,
                    "4.5353",
                    "114.7277"
                  );
                  //wheather geocoder gets error
                  rowData.push(masterData);

                  return;
                });
            }
          } catch (error) {
            console.warn("err map", error);
            return;
          }
        }

        return null;
      })
    );
  }
  // console.warn("result", rowData);
  return rowData;
};

const saveDashboardData = (dispatch, page = 1) => {
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
      let result = await serverCall(
        `${endPoints.MY_TICKETS_API}?limit=3&page=${page}`,
        requestMethod.POST,
        params
      );

      if (result.success) {
        // console.warn("dispatch  row data", result?.data?.data?.rows.length);

        getModifiedInteractions(result?.data?.data?.rows)
          .then((data) => {
            // console.warn("result data :  ", data);
            // console.warn("final rsult ", data);
            getModifiedMasterTickets(
              data,
              result?.data?.data?.masterTicket?.rows
            )
              .then(async (finalData) => {
                // console.warn(
                //   "finalData =======stringify=====>" +
                //     "Page : " +
                //     page +
                //     "finalData : " +
                //     JSON.stringify(finalData)
                // );
                console.log(
                  "dispatch  master data",
                  finalData.map((d) => d.longitude)
                );

                dispatch(setMyDashboardData({ result: finalData, page: page }));
              })
              .catch(function (error) {
                console.log(
                  "There has been a problem with your getModifiedMasterTickets operation: " +
                    error.message
                );
              });
          })
          .catch(function (error) {
            console.log(
              "There has been a problem with your getModifiedInteractions operation: " +
                error.message
            );
          });

        //console.warn(getModifiedInteractions(DATA))
      } else {
        dispatch(setMyDashboardError(result));
      }
    });
};

const createObjMasterData = (
  masterTicketData,
  masterTicketLatitude,
  masterTicketLongitude
) => {
  const masterDataLocal = {
    intxnId: masterTicketData.intxnId,
    woType: "Master Interaction",
    currEntity: "ORG0000001",
    helpdeskId: null,
    chatId: null,
    currUser: null,
    currRole: 1,
    externalRefNo1: null,
    soId: null,
    woTypeDescription: "Master Interaction",
    serviceId: null,
    accessNbr: null,
    prodType: "",
    serviceTypeDesc: masterTicketData.description,
    customerId: 233197,
    currStatus: "NEW",
    createdAt: masterTicketData.createdAt,
    createdBy: "Admin IT",
    intxnType: "Master Interaction",
    intxnTypeDesc: "Master Interaction",
    priorityDesc: "HIGH",
    woTypeDesc: "Master Interaction",
    ticketTypeDesc: "Master Interaction",
    currStatusDesc: "New",
    sevearityDesc: null,
    accountId: null,
    contactNo: "",
    customerName: "",
    accountName: " ",
    externalRefSys1: null,
    accountNo: null,
    customerNbr: "",
    addressId: masterTicketData.address.addressId,
    addressType: "Master",
    houseNo: masterTicketData.address.hno,
    block: "",
    buildingName: masterTicketData.address.buildingName,
    street: masterTicketData.address.street,
    city: masterTicketData.address.city,
    town: "",
    state: masterTicketData.address.state,
    district: masterTicketData.address.district,
    country: masterTicketData.address.country,
    postCode: masterTicketData.address.postCode,
    latitude: masterTicketLatitude,
    longitude: masterTicketLongitude,
    zone: null,
    assigned: " ",
    createdEntityDesc: "Talian Darussalam",
    createdOu: null,
  };

  return masterDataLocal;
};

export function resetMyDashboardData(cbClearDB = () => {}, navigationCB) {
  return async (dispatch) => {
    dispatch(setMyDashboardData([]));
    await cbClearDB();
    navigationCB();
  };
}

import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import {
  BASE_URL,
  requestMethod,
  endPoints,
  BASE_URL_TENANT,
  PROD_BASE_URL_TENANT,
  PROD_BASE_URL,
} from "./ApiConstants";
import { strings } from "../Language/index";
const RNFetchBlob = require("rn-fetch-blob").default;
import { getDataFromDB, saveDataToDB, getToken } from "../../Storage/token";
import { storageKeys, DEBUG_BUILD } from "../../Utilities/Constants/Constant";
import { Platform, PermissionsAndroid } from "react-native";
import { TDLog } from "../Constants/Constant";

export const networkAvailable = () =>
  new Promise((resolve, reject) =>
    NetInfo.fetch().then((state) =>
      state.isConnected ? resolve(true) : resolve(false)
    )
  );

export const serverCall = async (url, method, data) =>
  new Promise(async (resolve, reject) => {
    // Internet Check and response error
    let net = await networkAvailable();
    TDLog(
      "Server API Call index.js BEFORE internet check :====>",
      url + "====>" + method + "=====>" + JSON.stringify(data)
    );
    TDLog("Server API Call index.js BEFORE internet check  net:====>", net);
    if (!net) {
      let requestObject = {};
      resolve({
        success: false,
        data: {},
        errorCode: "10001",
        message: strings.no_network,
        requestObject,
      });
    } else {
      getDataFromDB(storageKeys.ACCESS_TOKEN)
        .then(function (token) {
          return token;
        })
        .then(function (token) {
          TDLog(
            "Server API Call index.js fetch accessToken :",
            JSON.stringify(token)
          );
          var headers;
          let baseURL;

          if (DEBUG_BUILD) {
            baseURL = url.includes("bcae-tenant") ? BASE_URL_TENANT : BASE_URL;
          } else {
            baseURL = url.includes("bcae-tenant")
              ? PROD_BASE_URL_TENANT
              : PROD_BASE_URL;
          }

          let requestObject = {};

          if (token?.accessToken) {
            headers = {
              "Content-Type": "application/json",
              authorization: token.accessToken ? token.accessToken : "",
            };
          } else {
            headers = {
              "Content-Type": "application/json",
            };
          }

          if (method == requestMethod.GET) {
            requestObject = {
              url,
              method,
              baseURL: `${baseURL}`,
              headers,
            };
          } else {
            requestObject = {
              url,
              method,
              baseURL: `${baseURL}`,
              data,
              headers,
            };
          }
          TDLog(
            "Server API Call index.js BEFORE SERVER CALL requestObject :",
            JSON.stringify(requestObject)
          );
          axios
            .request(requestObject)
            .then(async (response) => {
              TDLog(
                "serverCall",
                "BCAE APPLICATION SERVER CALL AFTER SUCCESS SERVER CALL URL : " +
                  baseURL +
                  url +
                  +" : response :" +
                  JSON.stringify(response)
              );
              if (response.status === 200) {
                resolve({
                  success: true,
                  data: response.data,
                  message: "",
                  requestObject,
                });
              } else {
                resolve({
                  success: false,
                  data: {},
                  message: "",
                  requestObject,
                });
                TDLog(
                  "Server API Call index.js AFTER SUCCESS SERVER CALL response :",
                  JSON.stringify(response)
                );
              }
            })
            .catch(async (error) => {
              TDLog(
                "Server API Call index.js AFTER SERVER CALL ERROR :",
                JSON.stringify(error)
              );

              if (
                error?.message &&
                error?.message != null &&
                error?.message === "Your session has expired. Please try again"
              ) {
                var profileData = await getDataFromDB(
                  storageKeys.PROFILE_DETAILS
                );
                var refreshToken = await getDataFromDB(
                  storageKeys.REFRESH_TOKEN
                );

                axios
                  .request({
                    url: endPoints.REFRESH_TOKEN,
                    method: requestMethod.POST,
                    baseURL: `${baseURL}`,
                    data: {
                      userId: profileData.userId,
                      refreshToken: refreshToken.refreshToken,
                    },
                    headers,
                  })
                  .then(async (response) => {
                    TDLog(
                      "Server API Call index.js AFTER SERVER CALL ERROR TOKEN response :",
                      JSON.stringify(response)
                    );

                    if (response?.data?.token) {
                      let accessTokenData = {
                        accessToken: response?.data?.token ?? "",
                      };
                      await saveDataToDB(
                        storageKeys.ACCESS_TOKEN,
                        accessTokenData
                      );

                      serverCall(url, method, data);
                    } else {
                      resolve({
                        success: false,
                        data: {},
                        message: "",
                        requestObject,
                      });
                    }
                  })
                  .catch(async (error) => {
                    TDLog(
                      "Server API Call index.js AFTER SERVER CALL ERROR TOKEN error :",
                      JSON.stringify(error)
                    );
                    if (
                      error?.response?.data?.message &&
                      error?.response?.data?.message != null &&
                      error?.response?.status &&
                      error.response.status != null
                    ) {
                      resolve({
                        success: false,
                        errorCode: error.response.status,
                        message: error.response.data.message,
                        requestObject,
                      });
                    } else {
                      TDLog(
                        "Server API Call index.js AFTER SERVER CALL ERROR TOKEN response :",
                        strings.something_went_wrong
                      );
                      resolve({
                        success: false,
                        errorCode: "10000",
                        message: strings.something_went_wrong,
                        requestObject,
                      });
                    }
                  });
              } else {
                if (
                  error?.response?.data?.message &&
                  error?.response?.data?.message != null &&
                  error?.response?.status &&
                  error.response.status != null
                ) {
                  resolve({
                    success: false,
                    errorCode: error.response.status,
                    message: error.response.data.message,
                    requestObject,
                  });
                } else {
                  TDLog(
                    "Server API Call index.js AFTER SERVER CALL response :",
                    strings.something_went_wrong
                  );
                  resolve({
                    success: false,
                    errorCode: "10000",
                    message: strings.something_went_wrong,
                    requestObject,
                  });
                }
              }
            });
        });
    }
  });

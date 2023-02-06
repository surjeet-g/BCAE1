import { storageKeys } from "../Utilities/Constants/Constant";
import { saveData, getData } from "./DB";
import { TDLog } from "../Utilities/Constants/Constant";

export const saveToken = async (token) => {
  try {
    await saveData(storageKeys.ACCESS_TOKEN, token);
  } catch (err) {
    TDLog("saveToken", "==========catch============" + JSON.stringify(err));
    throw err;
  }
};

export const getToken = async () => {
  try {
    const token = await getData(storageKeys.ACCESS_TOKEN);
    TDLog(
      "getToken",
      "==========ACCESS_TOKEN============" + JSON.stringify(token)
    );

    if (token !== null && typeof token != "undefined") {
      return token;
    } else {
      return "";
    }
  } catch (err) {
    TDLog("getToken", "==========catch============" + JSON.stringify(err));
    return "";
  }
};

export const saveDataToDB = async (key, obj) => {
  TDLog(
    "saveDataToDB",
    "==========saveDataToDB======" + key + "======" + JSON.stringify(obj)
  );
  try {
    await saveData(key, obj);
  } catch (err) {
    TDLog("saveDataToDB", "==========catch============" + JSON.stringify(err));
    throw err;
  }
};

export const getDataFromDB = async (key) => {
  try {
    const data = await getData(key);
    TDLog(
      "getDataFromDB",
      "==========getDataFromDB=======" + key + "=======" + JSON.stringify(data)
    );
    if (data !== null && typeof data != "undefined") {
      return data;
    } else {
      return "";
    }
  } catch (err) {
    TDLog("getDataFromDB", "==========catch============" + JSON.stringify(err));
    return "";
  }
};

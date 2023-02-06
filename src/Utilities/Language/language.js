import { saveData, getData } from "../../Storage/DB";
import { storageKeys } from "../Constants/Constant";

export const saveLanguage = (language) => {
  try {
    saveData(storageKeys.LANGUAGE_KEY, JSON.stringify(language));
  } catch (err) {
    throw err;
  }
};

export const getLanguage = async () => {
  try {
    let language = await getData(storageKeys.LANGUAGE_KEY);
    if (language !== null && typeof language != "undefined") {
      return JSON.parse(language);
    }
  } catch (err) {
    throw err;
  }
  return { name: "English", langCode: "en" };
};

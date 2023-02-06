import { strings as AppStrings } from "../Language";
import { saveLanguage } from "../Language/language";

export const changeLanguage = async (language) => {
  saveLanguage(language);
  AppStrings.setLanguage(language.langCode);
};

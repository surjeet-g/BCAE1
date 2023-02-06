import AsyncStorage from "@react-native-community/async-storage";

export const saveData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    // console.log("response from ", await getData(key));
  } catch (err) {
    throw err;
  }
};

export const getData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== null && typeof data != "undefined") {
      //console.log("data============================>"+data    )
      let dta = JSON.parse(data);
      return dta;
    }
  } catch (err) {
    // throw err;
  }
  return null;
};

export const removeAsyncItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    console.log("error remove item from async store", exception);
    return false;
  }
};

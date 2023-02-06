import geocderLocalDb from "../../LocalData/geocoder.json";
import get from "lodash.get";
const getGeoAddress = async (postal) => {
  // console.warn("postal code", postal);
  const res = geocderLocalDb.filter((addr) => addr.postalCode === postal);
  // console.warn("res", postal, res);
  if (get(res, "length", 0) != 0) {
    return [
      { lat: parseFloat(res[0].latitude), lon: parseFloat(res[0].longitude) },
    ];
  } else {
    // console.warn("htting else case");
    return [
      {
        lat: parseFloat("4.5353"),
        lon: parseFloat("114.7277"),
      },
    ];
  }
};
export default getGeoAddress;

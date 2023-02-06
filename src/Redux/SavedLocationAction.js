export const SAVEDLOCATION_INIT = "SAVEDLOCATION_INIT";
export const SAVEDLOCATION_DATA = "SAVEDLOCATION_DATA";
export const SAVEDLOCATION_ERROR = "SAVEDLOCATION_ERROR";
export const ADDRESSLOOKUP_DATA = "ADDRESSLOOKUP_DATA";

export function initSavedLocation() {
  return { type: SAVEDLOCATION_INIT };
}

export function setSavedLocation(data) {
  return { type: SAVEDLOCATION_DATA, data };
}

export function savedLocationError(data) {
  return { type: SAVEDLOCATION_ERROR, data };
}

export function setAddressLoopUpData(data) {
  return { type: ADDRESSLOOKUP_DATA, data };
}

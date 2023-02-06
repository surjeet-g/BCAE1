export const PROFILE_INIT = "PROFILE_INIT";
export const PROFILE_DATA = "PROFILE_DATA";
export const PROFILE_ERROR = "PROFILE_ERROR";

export function initProfile() {
  return { type: PROFILE_INIT };
}

export function setProfileData(data) {
  return { type: PROFILE_DATA, data };
}

export function setProfileError(data) {
  return { type: PROFILE_ERROR, data };
}

export const MYDASHBOARD_INIT = "MYDASHBOARD_INIT";
export const MYDASHBOARD_DATA = "MYDASHBOARD_DATA";
export const MYDASHBOARD_ERROR = "MYDASHBOARD_ERROR";
export const MYDASHBOARD_INIT_BACKGROUND = "MYDASHBOARD_INIT_BACKGROUND";

export function initMyDashboardData() {
  return { type: MYDASHBOARD_INIT };
}

export function setMyDashboardData(data) {
  return { type: MYDASHBOARD_DATA, data };
}

export function setMyDashboardError(data) {
  return { type: MYDASHBOARD_ERROR, data };
}

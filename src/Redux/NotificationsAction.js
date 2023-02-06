export const NOTIFICATIONS_INIT = 'NOTIFICATIONS_INIT';
export const NOTIFICATIONS_DATA = 'NOTIFICATIONS_DATA';
export const NOTIFICATIONS_ERROR = 'NOTIFICATIONS_ERROR';

export function initNotificationsData() {
    return { type: NOTIFICATIONS_INIT,  }
}

export function setNotificationsData(data) {
    return { type: NOTIFICATIONS_DATA, data }
}

export function setNotificationsError(data) {
    return { type: NOTIFICATIONS_ERROR, data }
}

/* All actions relevant to the Container component */

export const SET_LOADING = 'SET_LOADING';
export const SET_SUCCESS_MESSAGE = 'SET_SUCCESS_MESSAGE';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';
export const IS_UPLOADING = 'IS_UPLOADING';

export function isUploading(uploading) {
  return { type: IS_UPLOADING, uploading };
}

export function setLoading(loading, showRetryButton = false) {
  return { type: SET_LOADING, loading, showRetryButton };
}

export function setSuccessMessage(msg) {
  return { type: SET_SUCCESS_MESSAGE, message: msg };
}

export function setErrorMessage(msg) {
  return { type: SET_ERROR_MESSAGE, message: msg };
}

export function clearMessages() {
  return { type: CLEAR_MESSAGES };
}

/** @format */

import {
  SNACKBAR_CLEAR,
  SNACKBAR_ERROR,
  SNACKBAR_INFO,
  SNACKBAR_SUCCESS,
  SNACKBAR_WARNING,
} from "../types/ui.types";

const uiReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case SNACKBAR_SUCCESS:
      return {
        ...state,
        successSnackbarOpen: true,
        successSnackbarMessage: payload,
      };
    case SNACKBAR_ERROR:
      return {
        ...state,
        errorSnackbarOpen: true,
        errorSnackbarMessage: payload,
      };
    case SNACKBAR_INFO:
      return {
        ...state,
        infoSnackbarOpen: true,
        infoSnackbarMessage: payload,
      };
    case SNACKBAR_WARNING:
      return {
        ...state,
        warningSnackbarOpen: true,
        warningSnackbarMessage: payload,
      };

    case SNACKBAR_CLEAR:
      return {
        ...state,
        successSnackbarOpen: false,
        infoSnackbarOpen: false,
        warningSnackbarOpen: false,
        errorSnackbarOpen: false,
      };
    default:
      return state;
  }
};

export default uiReducer;

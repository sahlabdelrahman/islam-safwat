/** @format */

import {
  SNACKBAR_CLEAR,
  SNACKBAR_ERROR,
  SNACKBAR_INFO,
  SNACKBAR_SUCCESS,
  SNACKBAR_WARNING,
} from "../types/ui.types";

export const showSuccessSnackbar = (message) => {
  return {
    type: SNACKBAR_SUCCESS,
    payload: message,
  };
};

export const showInfoSnackbar = (message) => {
  return {
    type: SNACKBAR_INFO,
    payload: message,
  };
};

export const showWarningSnackbar = (message) => {
  return {
    type: SNACKBAR_WARNING,
    payload: message,
  };
};

export const showErrorSnackbar = (message) => {
  return {
    type: SNACKBAR_ERROR,
    payload: message,
  };
};

export const clearSnackbar = () => {
  return {
    type: SNACKBAR_CLEAR,
  };
};

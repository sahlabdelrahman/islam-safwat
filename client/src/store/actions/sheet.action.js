/** @format */

import SheetsService from "services/sheets.service";

import { getMessageFromError } from "functions/handleErrors";

const {
  GET_SHEETS,
  DELETE_SHEET,
  ADD_SHEET,
  EDIT_SHEET,
  REORDER_SHEETS,
} = require("store/types/sheet.type");

export const getSheets = () => async (dispatch) => {
  try {
    const res = await SheetsService.getSheets();

    dispatch({
      type: GET_SHEETS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const reorderSheets = (sheets) => async (dispatch) => {
  try {
    const res = await SheetsService.reorderSheets(sheets);
    await dispatch({
      type: REORDER_SHEETS,
      payload: sheets,
    });
    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const addSheet = (captions, files) => async (dispatch) => {
  try {
    const res = await SheetsService.addSheet(captions, files);

    dispatch({
      type: ADD_SHEET,
      payload: res.data.sheets,
    });

    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const editSheet = (id, caption) => async (dispatch) => {
  try {
    const res = await SheetsService.editSheet(id, caption);

    dispatch({
      type: EDIT_SHEET,
      payload: { id, caption },
    });

    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const deleteSheet = (id, imageId) => async (dispatch) => {
  try {
    const res = await SheetsService.deleteSheet(id, imageId);
    dispatch({
      type: DELETE_SHEET,
      payload: { id },
    });

    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

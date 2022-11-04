/** @format */

import SinglesService from "services/singles.service";

import { getMessageFromError } from "functions/handleErrors";
import {
  ADD_SINGLE,
  DELETE_SINGLE,
  EDIT_SINGLE,
  GET_SINGLES,
  REORDER_SINGLES,
} from "store/types/single.type";

export const getSingles = () => async (dispatch) => {
  try {
    const res = await SinglesService.getSingles();

    dispatch({
      type: GET_SINGLES,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const reorderSingles = (singles) => async (dispatch) => {
  try {
    const res = await SinglesService.reorderSingles(singles);
    await dispatch({
      type: REORDER_SINGLES,
      payload: singles,
    });
    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const addSingle = (captions, files) => async (dispatch) => {
  try {
    const res = await SinglesService.addSingle(captions, files);

    dispatch({
      type: ADD_SINGLE,
      payload: res.data.singles,
    });

    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const editSingle = (id, caption) => async (dispatch) => {
  try {
    const res = await SinglesService.editSingle(id, caption);

    dispatch({
      type: EDIT_SINGLE,
      payload: { id, caption },
    });

    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const deleteSingle = (id, imageId) => async (dispatch) => {
  try {
    const res = await SinglesService.deleteSingle(id, imageId);
    dispatch({
      type: DELETE_SINGLE,
      payload: { id },
    });

    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

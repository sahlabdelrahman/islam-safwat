/** @format */

import FeaturedServices from "services/featured.service";
import { getMessageFromError } from "functions/handleErrors";

import {
  ADD_FEATURED,
  DELETE_FEATURED,
  GET_FEATURED,
  REORDER_FEATURED,
} from "store/types/featured.type";

export const getFeatured = () => async (dispatch) => {
  try {
    const res = await FeaturedServices.getFeatured();
    dispatch({
      type: GET_FEATURED,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const reorderFeatured = (featured) => async (dispatch) => {
  try {
    const res = await FeaturedServices.reorderFeatured(featured);
    await dispatch({
      type: REORDER_FEATURED,
      payload: featured,
    });
    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const addFeatured = (file, onUploadProgress) => async (dispatch) => {
  try {
    const res = await FeaturedServices.addFeatured(file, onUploadProgress);
    dispatch({
      type: ADD_FEATURED,
      payload: res.data.featured,
    });
    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const deleteFeatured = (id, imageId) => async (dispatch) => {
  try {
    const res = await FeaturedServices.deleteFeatured(id, imageId);

    dispatch({
      type: DELETE_FEATURED,
      payload: { id },
    });

    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

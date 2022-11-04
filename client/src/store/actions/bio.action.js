/** @format */

import BioService from "services/bio.service";
import { EDIT_BIO, EDIT_BIO_IMAGE, GET_BIO } from "store/types/bio.type";

import { getMessageFromError } from "functions/handleErrors";

export const getBio = () => async (dispatch) => {
  try {
    const res = await BioService.getBio();

    dispatch({
      type: GET_BIO,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const editBio = (id, body) => async (dispatch) => {
  try {
    const res = await BioService.editBio(id, body);

    dispatch({
      type: EDIT_BIO,
      payload: res.data.bio,
    });

    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const editImage =
  (id, imageId, file, onUploadProgress) => async (dispatch) => {
    try {
      const res = await BioService.editImage(
        id,
        imageId,
        file,
        onUploadProgress
      );

      dispatch({
        type: EDIT_BIO_IMAGE,
        payload: res.data.bio,
      });

      return Promise.resolve(res.data.msg);
    } catch (error) {
      const message = getMessageFromError(error);
      return Promise.reject(message);
    }
  };

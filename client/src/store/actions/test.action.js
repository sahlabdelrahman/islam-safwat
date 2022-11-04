/** @format */

import TestService from "services/test.service";

import { getMessageFromError } from "functions/handleErrors";
import { GET_TEST } from "store/types/test.type";

export const getTest = () => async (dispatch) => {
  try {
    const res = await TestService.getTest();

    dispatch({
      type: GET_TEST,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

// export const reorderSingles = (singles) => async (dispatch) => {
//   try {
//     const res = await SinglesService.reorderSingles(singles);
//     await dispatch({
//       type: REORDER_SINGLES,
//       payload: singles,
//     });
//     return Promise.resolve(res.data.msg);
//   } catch (error) {
//     const message = getMessageFromError(error);
//     return Promise.reject(message);
//   }
// };

// export const addSingle =
//   (file, caption, onUploadProgress) => async (dispatch) => {
//     try {
//       const res = await SinglesService.addSingle(
//         file,
//         caption,
//         onUploadProgress
//       );

//       dispatch({
//         type: ADD_SINGLE,
//         payload: res.data.single,
//       });

//       return Promise.resolve(res.data.msg);
//     } catch (error) {
//       const message = getMessageFromError(error);
//       return Promise.reject(message);
//     }
//   };

// export const editSingle = (id, caption) => async (dispatch) => {
//   try {
//     const res = await SinglesService.editSingle(id, caption);

//     dispatch({
//       type: EDIT_SINGLE,
//       payload: { id, caption },
//     });

//     return Promise.resolve(res.data.msg);
//   } catch (error) {
//     const message = getMessageFromError(error);
//     return Promise.reject(message);
//   }
// };

// export const deleteSingle = (id, imageId) => async (dispatch) => {
//   try {
//     const res = await SinglesService.deleteSingle(id, imageId);
//     dispatch({
//       type: DELETE_SINGLE,
//       payload: { id },
//     });

//     return Promise.resolve(res.data.msg);
//   } catch (error) {
//     const message = getMessageFromError(error);
//     return Promise.reject(message);
//   }
// };

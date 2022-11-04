/** @format */

import {
  ADD_IMAGE,
  ADD_TEXT,
  ADD_VIDEO,
  DELETE_IMAGE,
  DELETE_TEXT,
  DELETE_VIDEO,
  EDIT_IMAGE,
  EDIT_TEXT,
  GET_PROJECT,
  REORDER_PROJECT_IMAGES,
  UPDATE_COVER,
} from "store/types/project.type";

const initialState = {};

const singleProjectReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROJECT:
      return payload;
    case REORDER_PROJECT_IMAGES:
      return { ...state, items: [...payload] };
    case ADD_IMAGE:
      return { ...state, items: [...state.items, payload] };
    case ADD_TEXT:
      return { ...state, items: [...state.items, payload] };
    case ADD_VIDEO:
      return { ...state, video: payload };
    case UPDATE_COVER:
      return { ...state, cover: payload };
    case DELETE_IMAGE:
      return {
        ...state,
        items: state.items.filter(({ imageId }) => imageId !== payload.imageId),
      };
    case DELETE_TEXT:
      return {
        ...state,
        items: state.items.filter(({ _id }) => _id !== payload.textId),
      };
    case DELETE_VIDEO:
      return { ...state, video: { videoUrl: "" } };
    case EDIT_IMAGE:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.imageId === payload.imageId) {
            return { ...item, caption: payload.caption };
          } else {
            return item;
          }
        }),
      };
    case EDIT_TEXT:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item._id === payload.textId) {
            return { ...item, text: payload.text };
          } else {
            return item;
          }
        }),
      };
    default:
      return state;
  }
};

export default singleProjectReducer;

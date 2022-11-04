/** @format */

import {
  ADD_IMAGE_TO_NEW,
  ADD_TEXT_TO_NEW,
  ADD_VIDEO_TO_NEW,
  DELETE_NEW_IMAGE,
  DELETE_NEW_TEXT,
  DELETE_NEW_VIDEO,
  EDIT_NEW_IMAGE,
  EDIT_NEW_TEXT,
  GET_NEW,
  REORDER_NEW_IMAGES,
  UPDATE_NEW_COVER,
} from "store/types/news.type";

const initialState = {};

const singleNewsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_NEW:
      return payload;
    case REORDER_NEW_IMAGES:
      return { ...state, items: [...payload] };
    case ADD_IMAGE_TO_NEW:
      return { ...state, items: [...state.items, payload] };
    case ADD_TEXT_TO_NEW:
      return { ...state, items: [...state.items, payload] };
    case ADD_VIDEO_TO_NEW:
      return { ...state, video: payload };
    case UPDATE_NEW_COVER:
      return { ...state, cover: payload };
    case DELETE_NEW_IMAGE:
      return {
        ...state,
        items: state.items.filter(({ imageId }) => imageId !== payload.imageId),
      };
    case DELETE_NEW_TEXT:
      return {
        ...state,
        items: state.items.filter(({ _id }) => _id !== payload.textId),
      };
    case DELETE_NEW_VIDEO:
      return { ...state, video: { videoUrl: "" } };
    case EDIT_NEW_IMAGE:
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
    case EDIT_NEW_TEXT:
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

export default singleNewsReducer;

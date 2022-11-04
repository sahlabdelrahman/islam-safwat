/** @format */

import {
  ADD_FEATURED,
  DELETE_FEATURED,
  GET_FEATURED,
  REORDER_FEATURED,
} from "../types/featured.type";

const initialState = [];

const featuredReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_FEATURED:
      return payload;
    case REORDER_FEATURED:
      return [...payload];
    case ADD_FEATURED:
      return [...state, payload];
    case DELETE_FEATURED:
      return state.filter(({ _id }) => _id !== payload.id);
    default:
      return state;
  }
};

export default featuredReducer;

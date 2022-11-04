/** @format */

import { SET_THEME } from "store/types/theme.type";

const initialState = true;

const themeReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case SET_THEME:
      return !state;

    default:
      return state;
  }
};

export default themeReducer;

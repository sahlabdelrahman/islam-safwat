/** @format */

const {
  GET_SHEETS,
  DELETE_SHEET,
  ADD_SHEET,
  EDIT_SHEET,
  REORDER_SHEETS,
} = require("store/types/sheet.type");

const initialState = [];

const sheetReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SHEETS:
      return payload;

    case REORDER_SHEETS:
      return [...payload];

    case ADD_SHEET:
      return [...state, ...payload];

    case DELETE_SHEET:
      return state.filter(({ _id }) => _id !== payload.id);

    case EDIT_SHEET:
      return state.map((item) => {
        if (item._id === payload.id) {
          return { ...item, caption: payload.caption };
        } else {
          return item;
        }
      });

    default:
      return state;
  }
};

export default sheetReducer;

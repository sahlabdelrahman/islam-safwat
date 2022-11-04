/** @format */

const {
  GET_SINGLES,
  DELETE_SINGLE,
  ADD_SINGLE,
  EDIT_SINGLE,
  REORDER_SINGLES,
} = require("store/types/single.type");

const initialState = [];

const singleReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SINGLES:
      return payload;

    case REORDER_SINGLES:
      return [...payload];

    case ADD_SINGLE:
      return [...state, ...payload];

    case DELETE_SINGLE:
      return state.filter(({ _id }) => _id !== payload.id);

    case EDIT_SINGLE:
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

export default singleReducer;

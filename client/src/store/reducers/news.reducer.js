/** @format */

const {
  GET_NEWS,
  ADD_NEW,
  DELETE_NEW,
  EDIT_NEW,
  REORDER_NEWS,
} = require("store/types/news.type");

const initialState = [];

const newsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_NEWS:
      return payload;
    case REORDER_NEWS:
      return [...payload];
    case ADD_NEW:
      return [...state, payload];
    case DELETE_NEW:
      return state.filter(({ _id }) => _id !== payload.id);

    case EDIT_NEW:
      return state.map((item) => {
        if (item._id === payload.id) {
          return {
            ...item,
            title: payload.title,
            description: payload.description,
          };
        } else {
          return item;
        }
      });

    default:
      return state;
  }
};

export default newsReducer;

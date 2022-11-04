/** @format */

const {
  GET_PROJECTS,
  ADD_PROJECT,
  DELETE_PROJECT,
  EDIT_PROJECT,
  REORDER_PROJECTS,
} = require("store/types/project.type");

const initialState = [];

const projectReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROJECTS:
      return payload;
    case REORDER_PROJECTS:
      return [...payload];
    case ADD_PROJECT:
      return [...state, payload];
    case DELETE_PROJECT:
      return state.filter(({ _id }) => _id !== payload.id);

    case EDIT_PROJECT:
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

export default projectReducer;

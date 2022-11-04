/** @format */

const { HANDLE_CONTACT } = require("store/types/contact.type");

const initialState = false;

const contactReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case HANDLE_CONTACT:
      return !state;
    default:
      return state;
  }
};

export default contactReducer;

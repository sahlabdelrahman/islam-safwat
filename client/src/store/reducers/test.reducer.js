/** @format */

const { GET_TEST } = require("store/types/test.type");

const initialState = [];

const testReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TEST:
      return payload;
    default:
      return state;
  }
};

export default testReducer;

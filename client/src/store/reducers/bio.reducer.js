/** @format */

const { GET_BIO, EDIT_BIO, EDIT_BIO_IMAGE } = require("store/types/bio.type");

const initialState = {};

const bioReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_BIO:
      return payload;
    case EDIT_BIO:
      return { ...state, body: payload.body };
    case EDIT_BIO_IMAGE:
      return { ...state, imageUrl: payload.imageUrl, imageId: payload.imageId };
    default:
      return state;
  }
};

export default bioReducer;

/** @format */

import NewsService from "services/news.service";
import { getMessageFromError } from "functions/handleErrors";

const {
  GET_NEWS,
  ADD_NEW,
  DELETE_NEW,
  EDIT_NEW,
  REORDER_NEWS,
  ADD_IMAGE_TO_NEW,
  ADD_TEXT_TO_NEW,
  ADD_VIDEO_TO_NEW,
  DELETE_NEW_IMAGE,
  EDIT_NEW_IMAGE,
  GET_NEW,
  REORDER_NEW_IMAGES,
  UPDATE_NEW_COVER,
  DELETE_NEW_TEXT,
  EDIT_NEW_TEXT,
  DELETE_NEW_VIDEO,
} = require("store/types/news.type");

export const getNews = () => async (dispatch) => {
  try {
    const res = await NewsService.getNews();

    dispatch({
      type: GET_NEWS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};
export const getNew = (id) => async (dispatch) => {
  try {
    const res = await NewsService.getNew(id);
    dispatch({
      type: GET_NEW,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const reorderNews = (news) => async (dispatch) => {
  try {
    const res = await NewsService.reorderNews(news);
    await dispatch({
      type: REORDER_NEWS,
      payload: news,
    });
    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const reorderNewsImages = (images, newsId) => async (dispatch) => {
  try {
    const res = await NewsService.reorderNewsImages(images, newsId);
    await dispatch({
      type: REORDER_NEW_IMAGES,
      payload: images,
    });
    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const addNew =
  (title, description, captions, files) => async (dispatch) => {
    const res = await NewsService.addNew(title, description, captions, files);

    try {
      dispatch({
        type: ADD_NEW,
        payload: res.data.new,
      });

      return Promise.resolve(res.data.msg);
    } catch (error) {
      const message = getMessageFromError(error);
      return Promise.reject(message);
    }
  };

export const addImageToNew =
  (file, id, caption, type, onUploadProgress) => async (dispatch) => {
    try {
      const res = await NewsService.addImage(
        file,
        id,
        caption,
        type,
        onUploadProgress
      );

      dispatch({
        type: ADD_IMAGE_TO_NEW,
        payload: res.data.item,
      });

      return Promise.resolve(res.data.msg);
    } catch (error) {
      const message = getMessageFromError(error);
      return Promise.reject(message);
    }
  };

export const addTextToNew = (text, id, type) => async (dispatch) => {
  try {
    const res = await NewsService.addText(text, id, type);

    dispatch({
      type: ADD_TEXT_TO_NEW,
      payload: res.data.item,
    });

    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const addVideoToNew = (url, id) => async (dispatch) => {
  try {
    const res = await NewsService.addVideoToNew(url, id);
    dispatch({
      type: ADD_VIDEO_TO_NEW,
      payload: res.data.video,
    });

    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const updateNewCover =
  (file, id, onUploadProgress) => async (dispatch) => {
    try {
      const res = await NewsService.updateNewCover(file, id, onUploadProgress);

      dispatch({
        type: UPDATE_NEW_COVER,
        payload: res.data.cover,
      });

      return Promise.resolve(res.data.msg);
    } catch (error) {
      const message = getMessageFromError(error);
      return Promise.reject(message);
    }
  };

export const editNew = (id, title, description) => async (dispatch) => {
  try {
    const res = await NewsService.editNew(id, title, description);

    dispatch({
      type: EDIT_NEW,
      payload: {
        id,
        title,
        description,
      },
    });
    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const editNewImageCaption =
  (newsId, imageId, caption) => async (dispatch) => {
    try {
      const res = await NewsService.editNewImageCaption(
        newsId,
        imageId,
        caption
      );

      dispatch({
        type: EDIT_NEW_IMAGE,
        payload: {
          imageId,
          caption,
        },
      });
      return Promise.resolve(res.data.msg);
    } catch (error) {
      const message = getMessageFromError(error);
      return Promise.reject(message);
    }
  };

export const editNewText = (newsId, textId, text) => async (dispatch) => {
  try {
    const res = await NewsService.editNewText(newsId, textId, text);

    dispatch({
      type: EDIT_NEW_TEXT,
      payload: {
        textId,
        text,
      },
    });
    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const deleteNew = (id, title) => async (dispatch) => {
  try {
    const res = await NewsService.deleteNew(id, title);

    dispatch({
      type: DELETE_NEW,
      payload: { id },
    });

    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const deleteImageFromNew = (newsId, imageId) => async (dispatch) => {
  try {
    const res = await NewsService.deleteImageFromNew(newsId, imageId);

    dispatch({
      type: DELETE_NEW_IMAGE,
      payload: {
        imageId,
      },
    });
    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const deleteTextFromNew = (newsId, textId) => async (dispatch) => {
  try {
    const res = await NewsService.deleteTextFromNew(newsId, textId);

    dispatch({
      type: DELETE_NEW_TEXT,
      payload: {
        textId,
      },
    });
    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const deleteVideoFromNew = (newsId, textId) => async (dispatch) => {
  try {
    const res = await NewsService.deleteVideoFromNew(newsId, textId);

    dispatch({
      type: DELETE_NEW_VIDEO,
    });
    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

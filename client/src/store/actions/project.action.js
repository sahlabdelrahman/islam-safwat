/** @format */

import ProjectService from "services/project.service";

import {
  ADD_IMAGE,
  ADD_TEXT,
  ADD_PROJECT,
  ADD_VIDEO,
  DELETE_IMAGE,
  DELETE_PROJECT,
  EDIT_IMAGE,
  EDIT_PROJECT,
  GET_PROJECT,
  GET_PROJECTS,
  REORDER_PROJECTS,
  REORDER_PROJECT_IMAGES,
  UPDATE_COVER,
  DELETE_TEXT,
  EDIT_TEXT,
  DELETE_VIDEO,
} from "store/types/project.type";

import { getMessageFromError } from "functions/handleErrors";

export const getProjects = () => async (dispatch) => {
  try {
    const res = await ProjectService.getProjects();

    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};
export const getProject = (id) => async (dispatch) => {
  try {
    const res = await ProjectService.getProject(id);
    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const reorderProjects = (projects) => async (dispatch) => {
  try {
    const res = await ProjectService.reorderProjects(projects);
    await dispatch({
      type: REORDER_PROJECTS,
      payload: projects,
    });
    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const reorderProjectImages = (images, projectId) => async (dispatch) => {
  try {
    const res = await ProjectService.reorderProjectImages(images, projectId);
    await dispatch({
      type: REORDER_PROJECT_IMAGES,
      payload: images,
    });
    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const addProject =
  (title, description, captions, files) => async (dispatch) => {
    const res = await ProjectService.addProject(
      title,
      description,
      captions,
      files
    );

    try {
      dispatch({
        type: ADD_PROJECT,
        payload: res.data.project,
      });

      return Promise.resolve(res.data.msg);
    } catch (error) {
      const message = getMessageFromError(error);
      return Promise.reject(message);
    }
  };

export const addImage =
  (file, id, caption, type, onUploadProgress) => async (dispatch) => {
    try {
      const res = await ProjectService.addImage(
        file,
        id,
        caption,
        type,
        onUploadProgress
      );

      dispatch({
        type: ADD_IMAGE,
        payload: res.data.item,
      });

      return Promise.resolve(res.data.msg);
    } catch (error) {
      const message = getMessageFromError(error);
      return Promise.reject(message);
    }
  };

export const addText = (text, id, type) => async (dispatch) => {
  try {
    const res = await ProjectService.addText(text, id, type);

    dispatch({
      type: ADD_TEXT,
      payload: res.data.item,
    });

    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const addVideo = (url, id) => async (dispatch) => {
  try {
    const res = await ProjectService.addVideo(url, id);
    dispatch({
      type: ADD_VIDEO,
      payload: res.data.video,
    });

    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const updateCover = (file, id, onUploadProgress) => async (dispatch) => {
  try {
    const res = await ProjectService.updateCover(file, id, onUploadProgress);

    dispatch({
      type: UPDATE_COVER,
      payload: res.data.cover,
    });

    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const editProject = (id, title, description) => async (dispatch) => {
  try {
    const res = await ProjectService.editProject(id, title, description);

    dispatch({
      type: EDIT_PROJECT,
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

export const editImageCaption =
  (projectId, imageId, caption) => async (dispatch) => {
    try {
      const res = await ProjectService.editImageCaption(
        projectId,
        imageId,
        caption
      );

      dispatch({
        type: EDIT_IMAGE,
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

export const editText = (projectId, textId, text) => async (dispatch) => {
  try {
    const res = await ProjectService.editText(projectId, textId, text);

    dispatch({
      type: EDIT_TEXT,
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

export const deleteProject = (id, title) => async (dispatch) => {
  try {
    const res = await ProjectService.deleteProject(id, title);

    dispatch({
      type: DELETE_PROJECT,
      payload: { id },
    });

    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

export const deleteImageFromProject =
  (projectId, imageId) => async (dispatch) => {
    try {
      const res = await ProjectService.deleteImageFromProject(
        projectId,
        imageId
      );

      dispatch({
        type: DELETE_IMAGE,
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

export const deleteTextFromProject =
  (projectId, textId) => async (dispatch) => {
    try {
      const res = await ProjectService.deleteTextFromProject(projectId, textId);

      dispatch({
        type: DELETE_TEXT,
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

export const deleteVideoFromProject = (projectId) => async (dispatch) => {
  try {
    const res = await ProjectService.deleteVideoFromProject(projectId);

    dispatch({
      type: DELETE_VIDEO,
    });
    return Promise.resolve(res.data.msg);
  } catch (error) {
    const message = getMessageFromError(error);
    return Promise.reject(message);
  }
};

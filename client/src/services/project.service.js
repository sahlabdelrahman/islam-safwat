/** @format */

import axios from "axios";
import authHeader from "./auth-header.service";

const getProjects = async () => {
  return axios.get(`api/project/get-projects`);
};

const getProject = async (id) => {
  return axios.post(`api/project/get-project`, {
    id,
  });
};

const reorderProjects = async (projects) => {
  return await axios.put(
    `api/project/reorder-projects`,
    { projects },
    { headers: authHeader() }
  );
};

const reorderProjectImages = async (images, projectId) => {
  return await axios.put(
    `api/project/reorder-images`,
    { images, projectId },
    { headers: authHeader() }
  );
};

const addProject = async (title, description, captions, files) => {
  let formData = new FormData();

  formData.append("title", title);
  formData.append("description", description);

  Object.values(captions).forEach((item) => {
    formData.append("captions", item);
  });

  Object.values(files).forEach((item) => {
    formData.append("project", item);
  });

  return await axios.post(`api/project/add-project`, formData, {
    headers: {
      "content-type": "multipart/form-data",
      ...authHeader(),
    },
    // onUploadProgress,
  });
};

const addImage = async (file, id, caption, type, onUploadProgress) => {
  let formData = new FormData();
  formData.append("id", id);
  formData.append("caption", caption);
  formData.append("type", type);
  formData.append("image", file);

  return await axios.post(`api/project/add-image`, formData, {
    headers: {
      "content-type": "multipart/form-data",
      ...authHeader(),
    },
    onUploadProgress,
  });
};

const addText = async (text, id, type) => {
  return await axios.post(
    `api/project/add-text`,
    {
      text,
      id,
      type,
    },
    {
      headers: {
        ...authHeader(),
      },
    }
  );
};

const addVideo = async (url, id) => {
  return await axios.post(
    `api/project/add-video`,
    { url, id },
    {
      headers: authHeader(),
    }
  );
};

const updateCover = async (file, id, onUploadProgress) => {
  let formData = new FormData();
  formData.append("id", id);
  formData.append("project-cover", file);

  return await axios.put(`api/project/update-cover`, formData, {
    headers: {
      "content-type": "multipart/form-data",
      ...authHeader(),
    },
    onUploadProgress,
  });
};

const deleteProject = async (id, title) => {
  return axios.delete(`api/project/delete-project`, {
    headers: authHeader(),
    data: { id, title },
  });
};

const deleteImageFromProject = async (projectId, imageId) => {
  return axios.delete(`api/project/delete-image`, {
    headers: authHeader(),
    data: { id: projectId, imageId },
  });
};

const deleteTextFromProject = async (projectId, textId) => {
  return axios.delete(`api/project/delete-text`, {
    headers: authHeader(),
    data: { id: projectId, textId },
  });
};

const deleteVideoFromProject = async (projectId) => {
  return axios.delete(`api/project/delete-video`, {
    headers: authHeader(),
    data: { id: projectId },
  });
};

const editProject = async (id, title, description) => {
  return axios.put(
    `api/project/edit-project`,
    { id, title, description },
    { headers: authHeader() }
  );
};

const editImageCaption = async (projectId, imageId, caption) => {
  return axios.put(
    `api/project/edit-image`,
    { id: projectId, imageId, caption },
    { headers: authHeader() }
  );
};

const editText = async (projectId, textId, text) => {
  return axios.put(
    `api/project/edit-text`,
    { id: projectId, textId, text },
    { headers: authHeader() }
  );
};

const ProjectService = {
  getProjects,
  getProject,
  reorderProjects,
  reorderProjectImages,
  addProject,
  addImage,
  addText,
  addVideo,
  updateCover,
  deleteProject,
  deleteImageFromProject,
  deleteTextFromProject,
  deleteVideoFromProject,
  editProject,
  editImageCaption,
  editText,
};

export default ProjectService;

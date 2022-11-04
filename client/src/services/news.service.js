/** @format */

import axios from "axios";
import authHeader from "./auth-header.service";

const getNews = async () => {
  return axios.get(`api/news/get-news`);
};

const getNew = async (id) => {
  return axios.post(`api/news/get-new`, {
    id,
  });
};

const reorderNews = async (news) => {
  return await axios.put(
    `api/news/reorder-news`,
    { news },
    { headers: authHeader() }
  );
};

const reorderNewsImages = async (images, newsId) => {
  return await axios.put(
    `api/news/reorder-images`,
    { images, newsId },
    { headers: authHeader() }
  );
};

const addNew = async (title, description, captions, files) => {
  let formData = new FormData();

  formData.append("title", title);
  formData.append("description", description);

  Object.values(captions).forEach((item) => {
    formData.append("captions", item);
  });

  Object.values(files).forEach((item) => {
    formData.append("news", item);
  });

  return await axios.post(`api/news/add-news`, formData, {
    headers: {
      "content-type": "multipart/form-data",
      ...authHeader(),
    },
    // onUploadProgress,
  });
};

const addImageToNew = async (file, id, caption, type, onUploadProgress) => {
  let formData = new FormData();
  formData.append("id", id);
  formData.append("caption", caption);
  formData.append("type", type);
  formData.append("new", file);

  return await axios.post(`api/news/add-image`, formData, {
    headers: {
      "content-type": "multipart/form-data",
      ...authHeader(),
    },
    onUploadProgress,
  });
};

const addText = async (text, id, type) => {
  return await axios.post(
    `api/news/add-text`,
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

const addVideoToNew = async (url, id) => {
  return await axios.post(
    `api/news/add-video`,
    { url, id },
    {
      headers: authHeader(),
    }
  );
};

const updateNewCover = async (file, id, onUploadProgress) => {
  let formData = new FormData();
  formData.append("id", id);
  formData.append("new-cover", file);

  return await axios.put(`api/news/update-cover`, formData, {
    headers: {
      "content-type": "multipart/form-data",
      ...authHeader(),
    },
    onUploadProgress,
  });
};

const deleteNew = async (id, title) => {
  return axios.delete(`api/news/delete-news`, {
    headers: authHeader(),
    data: { id, title },
  });
};

const deleteImageFromNew = async (newsId, imageId) => {
  return axios.delete(`api/news/delete-image`, {
    headers: authHeader(),
    data: { id: newsId, imageId },
  });
};

const deleteTextFromNew = async (projectId, textId) => {
  return axios.delete(`api/news/delete-text`, {
    headers: authHeader(),
    data: { id: projectId, textId },
  });
};

const deleteVideoFromNew = async (newsId) => {
  return axios.delete(`api/news/delete-video`, {
    headers: authHeader(),
    data: { id: newsId },
  });
};

const editNew = async (id, title, description) => {
  return axios.put(
    `api/news/edit-news`,
    { id, title, description },
    { headers: authHeader() }
  );
};

const editNewImageCaption = async (newsId, imageId, caption) => {
  return axios.put(
    `api/news/edit-image`,
    { id: newsId, imageId, caption },
    { headers: authHeader() }
  );
};

const editNewText = async (newsId, textId, text) => {
  return axios.put(
    `api/news/edit-text`,
    { id: newsId, textId, text },
    { headers: authHeader() }
  );
};

const NewsService = {
  getNews,
  getNew,
  reorderNews,
  reorderNewsImages,
  addNew,
  addImageToNew,
  addText,
  addVideoToNew,
  updateNewCover,
  deleteNew,
  deleteImageFromNew,
  deleteTextFromNew,
  deleteVideoFromNew,
  editNew,
  editNewImageCaption,
  editNewText,
};

export default NewsService;

/** @format */

import axios from "axios";
import authHeader from "./auth-header.service";

const getBio = async () => {
  return await axios.get(`api/bio/get`);
};

// const addBio = async (body, imageUrl, imageId) => {
//   return await axios.post(`api/bio/add`, { body, imageUrl, imageId });
// };

const editBio = async (id, body) => {
  return await axios.put(
    `api/bio/edit`,
    { id, body },
    { headers: authHeader() }
  );
};

const editImage = async (id, imageId, file, onUploadProgress) => {
  let formData = new FormData();
  formData.append("oldImageId", imageId);
  formData.append("id", id);
  formData.append("bio", file);
  return await axios.put(`api/bio/edit-image`, formData, {
    headers: {
      "content-type": "multipart/form-data",
      ...authHeader(),
    },
    onUploadProgress,
  });
};

const BioService = { getBio, editBio, editImage };

export default BioService;

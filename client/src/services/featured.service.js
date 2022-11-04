/** @format */

import axios from "axios";
import authHeader from "./auth-header.service";

const getFeatured = async () => {
  return await axios.get(`api/featured/get-featured`);
};

const reorderFeatured = async (featured) => {
  return await axios.put(
    `api/featured/reorder-featured`,
    { featured },
    { headers: authHeader() }
  );
};

const addFeatured = async (file, onUploadProgress) => {
  let formData = new FormData();
  formData.append("featured", file);

  return await axios.post(`api/featured/add-featured`, formData, {
    headers: {
      "content-type": "multipart/form-data",
      ...authHeader(),
    },
    onUploadProgress,
  });
};

const deleteFeatured = async (id, imageId) => {
  return await axios.delete(`api/featured/delete-featured`, {
    headers: authHeader(),
    data: { id, imageId },
  });
};

const FeaturedServices = {
  getFeatured,
  reorderFeatured,
  addFeatured,
  deleteFeatured,
};

export default FeaturedServices;

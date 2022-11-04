/** @format */

import axios from "axios";
import authHeader from "./auth-header.service";

const getSingles = async () => {
  return await axios.get(`api/single/get-singles`);
};

const reorderSingles = async (singles) => {
  return await axios.put(
    `api/single/reorder-singles`,
    { singles },
    { headers: authHeader() }
  );
};

const addSingle = async (captions, files) => {
  let formData = new FormData();

  Object.values(captions).forEach((item) => {
    formData.append("captions", item);
  });

  Object.values(files).forEach((item) => {
    formData.append("single", item);
  });

  return await axios.post(`api/single/add-single`, formData, {
    headers: {
      "content-type": "multipart/form-data",
      ...authHeader(),
    },
  });
};

const deleteSingle = async (id, imageId) => {
  return await axios.delete(`api/single/delete-single`, {
    headers: authHeader(),
    data: { id, imageId },
  });
};

const editSingle = async (id, caption) => {
  return await axios.put(
    `api/single/edit-single`,
    { id, caption },
    { headers: authHeader() }
  );
};

const SinglesService = {
  getSingles,
  reorderSingles,
  addSingle,
  deleteSingle,
  editSingle,
};

export default SinglesService;

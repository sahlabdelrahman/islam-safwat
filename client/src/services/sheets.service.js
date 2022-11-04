/** @format */

import axios from "axios";
import authHeader from "./auth-header.service";

const getSheets = async () => {
  return await axios.get(`api/sheet/get-sheets`);
};

const reorderSheets = async (sheets) => {
  return await axios.put(
    `api/sheet/reorder-sheets`,
    { sheets },
    { headers: authHeader() }
  );
};

const addSheet = async (captions, files) => {
  let formData = new FormData();

  Object.values(captions).forEach((item) => {
    formData.append("captions", item);
  });

  Object.values(files).forEach((item) => {
    formData.append("sheet", item);
  });

  return await axios.post(`api/sheet/add-sheet`, formData, {
    headers: {
      "content-type": "multipart/form-data",
      ...authHeader(),
    },
  });
};

const deleteSheet = async (id, imageId) => {
  return await axios.delete(`api/sheet/delete-sheet`, {
    headers: authHeader(),
    data: { id, imageId },
  });
};

const editSheet = async (id, caption) => {
  return await axios.put(
    `api/sheet/edit-sheet`,
    { id, caption },
    { headers: authHeader() }
  );
};

const SheetsService = {
  getSheets,
  reorderSheets,
  addSheet,
  deleteSheet,
  editSheet,
};

export default SheetsService;

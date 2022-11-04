/** @format */

import axios from "axios";
// import authHeader from "./auth-header.service";

const getTest = async () => {
  return await axios.get(`api/test/get-test`);
};

// const reorderSingles = async (singles) => {
//   return await axios.put(
//     `api/single/reorder-singles`,
//     { singles },
//     { headers: authHeader() }
//   );
// };

// const addSingle = async (file, caption, onUploadProgress) => {
//   let formData = new FormData();
//   formData.append("caption", caption);
//   formData.append("single", file);

//   return await axios.post(`api/single/add-single`, formData, {
//     headers: {
//       "content-type": "multipart/form-data",
//       ...authHeader(),
//     },
//     onUploadProgress,
//   });
// };

// const deleteSingle = async (id, imageId) => {
//   return await axios.delete(`api/single/delete-single`, {
//     headers: authHeader(),
//     data: { id, imageId },
//   });
// };

// const editSingle = async (id, caption) => {
//   return await axios.put(
//     `api/single/edit-single`,
//     { id, caption },
//     { headers: authHeader() }
//   );
// };

const TestService = {
  getTest,
};

export default TestService;

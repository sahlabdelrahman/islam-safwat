/** @format */

import { useState } from "react";
import { useDispatch } from "react-redux";

import { Button } from "@mui/material";

import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "store/actions/ui.action";

import "css/Dashboard/AddVideo/index.css";

const AddVideo = ({ addVideo, projectId }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(addVideo(url, projectId))
      .then((message) => dispatch(showSuccessSnackbar(message)))
      .catch((message) => showErrorSnackbar(message));
    setLoading(false);
    setUrl("");
  };

  return (
    <div className="add-video">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Url video"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        {loading ? (
          <Button disabled>Loading...</Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#000",
              ":hover": { backgroundColor: "#000" },
            }}
          >
            Add video
          </Button>
        )}
      </form>
    </div>
  );
};

export default AddVideo;

/** @format */

import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { Button, IconButton, LinearProgress, Grow } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import {
  showErrorSnackbar,
  showSuccessSnackbar,
  showWarningSnackbar,
} from "store/actions/ui.action";

import { validationData } from "data/static-data";

const AddItem = ({ addImage, id }) => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [showThumb, setShowThumb] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const fileRef = useRef(null);

  const dispatch = useDispatch();

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setImgData(URL.createObjectURL(e.target.files[0]));
      setShowThumb(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      dispatch(showWarningSnackbar("You must add an image first"));
    } else if (file?.size > validationData.sizeOfImage) {
      dispatch(showWarningSnackbar("The image size must be less than 10MB"));
    } else {
      setProgress(0);
      setShowProgress(true);
      await dispatch(
        addImage(file, id, caption, "image", (e) => {
          setProgress(Math.round((100 * e.loaded) / e.total));
        })
      )
        .then((message) => {
          dispatch(showSuccessSnackbar(message));
        })
        .catch((message) => {
          dispatch(showErrorSnackbar(message));
        });
      setCaption("");
      setFile(null);
      fileRef.current.value = null;
      setShowProgress(false);
      setShowThumb(false);
      setImgData(null);
    }
  };

  return (
    <div className="add-image">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Caption"
          rows={4}
          maxLength={2200}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></textarea>
        <IconButton
          sx={{ color: "#000", mr: "4px" }}
          aria-label="upload picture"
          component="label"
        >
          <input
            type="file"
            name="featured"
            onChange={handleFile}
            accept={validationData.typesOfImage}
            ref={fileRef}
          />
          <AddPhotoAlternateIcon />
        </IconButton>

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#000",
            ":hover": { backgroundColor: "#000" },
          }}
        >
          Upload
        </Button>
      </form>
      {showThumb && (
        <div className="thumbnail">
          <Grow in={showProgress} timeout={500}>
            {<LinearProgress value={progress} color="inherit" />}
          </Grow>
          <Grow in={showThumb} timeout={500}>
            {<img src={imgData} alt="thumbnail" />}
          </Grow>
        </div>
      )}
    </div>
  );
};

export default AddItem;

/** @format */

import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import {
  showErrorSnackbar,
  showSuccessSnackbar,
  showWarningSnackbar,
} from "store/actions/ui.action";

import { motion } from "framer-motion";
import { Button, Grow, IconButton, LinearProgress } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";

import { validationData } from "data/static-data";

const AddItem = ({ addItem }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileInfos, setFileInfos] = useState([]);
  const [showThumb, setShowThumb] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const fileRef = useRef(null);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length <= 0) {
      dispatch(showWarningSnackbar("You must add at least one image."));
    } else if (selectedFiles.length > 10) {
      dispatch(showWarningSnackbar("You can only add 10 images."));
    } else {
      let pointerForSize = 0;
      for (let i = 0; i < selectedFiles.length; i++) {
        if (selectedFiles[i].size > validationData.sizeOfImage) {
          pointerForSize++;
        }
      }
      if (pointerForSize !== 0) {
        dispatch(
          showWarningSnackbar(
            `There ${
              pointerForSize === 1
                ? "is an image"
                : `are ${pointerForSize} images`
            } larger than 10 MB`
          )
        );
        return;
      } else {
        const captions = fileInfos.map((item) => item.caption);
        setShowProgress(true);
        await dispatch(addItem(captions, selectedFiles))
          .then((message) => dispatch(showSuccessSnackbar(message)))
          .catch((message) => dispatch(showErrorSnackbar(message)));

        setSelectedFiles([]);
        setFileInfos([]);
        fileRef.current.value = null;
        setShowProgress(false);
        setShowThumb(false);
      }
    }
  };

  const handleFiles = (e) => {
    if (e.target.value.length > 0) {
      setSelectedFiles(e.target.files);
      const files = Array.from(e.target.files);
      let fileInfos = files.map((file) => ({
        imgData: URL.createObjectURL(file),
        name: file.name,
        caption: "",
      }));

      setFileInfos(fileInfos);
      setShowThumb(true);
    }
  };

  const handleRemove = (itemName, itemData) => {
    setFileInfos(fileInfos.filter(({ imgData }) => imgData !== itemData));
    setSelectedFiles(
      [...selectedFiles].filter((file) => file.name !== itemName)
    );
  };

  const handleCaption = (e, i) => {
    const fileInfo = fileInfos[i];
    fileInfo.caption = e.target.value;
  };

  return (
    <div className="add-item">
      <form onSubmit={handleSubmit}>
        {showProgress && (
          <Grow in={showProgress} timeout={500}>
            {<LinearProgress className="project" color="inherit" />}
          </Grow>
        )}
        {showThumb && (
          <div className="thumbnails">
            <div className="container">
              {fileInfos.map((item, i) => (
                <motion.div layout className="item" key={item.name}>
                  <Grow in={showThumb} timeout={500}>
                    <div className="grow-item">
                      <img src={item.imgData} alt="thumbnail" />
                      <div className="overlay">
                        <div className="controls">
                          <CloseIcon
                            fontSize="small"
                            onClick={() =>
                              handleRemove(item.name, item.imgData)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </Grow>
                  <div className="form">
                    <textarea
                      placeholder="Caption"
                      rows={5}
                      maxLength={2200}
                      onChange={(e) => handleCaption(e, i)}
                    ></textarea>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        <div className="with-textarea-only">
          <div>
            <IconButton
              sx={{ color: "#000", mr: "4px" }}
              aria-label="upload picture"
              component="label"
            >
              <input
                type="file"
                name="single"
                onChange={handleFiles}
                accept={validationData.typesOfImage}
                multiple
                ref={fileRef}
              />
              <AddPhotoAlternateIcon />
            </IconButton>
          </div>

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#000",
              ":hover": { backgroundColor: "#000" },
            }}
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;

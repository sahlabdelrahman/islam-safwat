/** @format */

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { motion } from "framer-motion";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "store/actions/ui.action";

import "css/Video/index.css";

const Video = ({ id, url, deleteVideo }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [openForDelete, setOpenForDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    await dispatch(deleteVideo(id))
      .then((message) => dispatch(showSuccessSnackbar(message)))
      .catch((message) => dispatch(showErrorSnackbar(message)));
    setLoading(false);
    setOpenForDelete(false);
  };

  return (
    <>
      <motion.div layout className="video-container">
        <div dangerouslySetInnerHTML={{ __html: url }}></div>
        {isLoggedIn && (
          <div className="controls">
            <CloseIcon
              className="close-icon"
              onClick={() => setOpenForDelete(true)}
            />
          </div>
        )}
      </motion.div>

      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
        maxWidth="xs"
        // TransitionProps={{ onEntering: handleEntering }}
        open={openForDelete}
      >
        <DialogTitle>Delete</DialogTitle>

        <DialogContent dividers>
          <p>Are you sure you want to delete the Video?</p>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "#000" }}
            onClick={() => setOpenForDelete(false)}
          >
            Cancel
          </Button>
          {loading ? (
            <Button disabled>Loading...</Button>
          ) : (
            <Button sx={{ color: "#000" }} onClick={() => handleDelete()}>
              Ok
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Video;

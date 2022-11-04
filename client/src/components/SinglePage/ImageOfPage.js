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
import EditIcon from "@mui/icons-material/Edit";

import Image from "./Image";

import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "store/actions/ui.action";

const ImageOfPage = ({
  item,
  loadingSkelton,
  deleteImage,
  editImage,
  id,
  setCurrentSlide,
  index,
  handleClickOpen,
}) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [caption, setCaption] = useState(item.caption);
  const [openForDelete, setOpenForDelete] = useState(false);
  const [openForEdit, setOpenForEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    await dispatch(deleteImage(id, item.imageId))
      .then((message) => dispatch(showSuccessSnackbar(message)))
      .catch((message) => dispatch(showErrorSnackbar(message)));
    setLoading(false);
    setOpenForDelete(false);
  };

  const handleEdit = async () => {
    setLoading(true);

    await dispatch(editImage(id, item.imageId, caption))
      .then((message) => dispatch(showSuccessSnackbar(message)))
      .catch((message) => dispatch(showErrorSnackbar(message)));
    setLoading(false);
    setOpenForEdit(false);
  };

  return (
    <>
      <motion.div layout className="item">
        <div
          onClick={() => {
            if (!isLoggedIn) {
              setCurrentSlide(index);
              handleClickOpen();
            }
          }}
        >
          <Image propsOfItem={item} />
          {isLoggedIn && (
            <div className="overlay">
              <div className="controls">
                <EditIcon onClick={() => setOpenForEdit(true)} />
                <CloseIcon onClick={() => setOpenForDelete(true)} />
              </div>
            </div>
          )}
        </div>
        <span className="attached-caption">{item.caption}</span>
      </motion.div>

      {/* for delete */}
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
        maxWidth="xs"
        // TransitionProps={{ onEntering: handleEntering }}
        open={openForDelete}
      >
        <DialogTitle>Delete</DialogTitle>

        <DialogContent dividers>
          <p>Are you sure you want to delete the Image?</p>
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

      {/* for edit */}
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
        maxWidth="xs"
        // TransitionProps={{ onEntering: handleEntering }}
        open={openForEdit}
      >
        <DialogTitle>Edit</DialogTitle>

        <DialogContent dividers>
          <p>Edit a caption</p>
          <form id="edit-form">
            <textarea
              className="caption-input"
              required
              rows={5}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>
          </form>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#000" }} onClick={() => setOpenForEdit(false)}>
            Cancel
          </Button>
          {loading ? (
            <Button disabled>Loading...</Button>
          ) : (
            <Button
              sx={{ color: "#000" }}
              form="edit-form"
              onClick={() => handleEdit()}
            >
              Ok
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ImageOfPage;

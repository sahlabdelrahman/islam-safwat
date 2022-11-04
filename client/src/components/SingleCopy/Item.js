/** @format */

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

import { motion } from "framer-motion";
import Image from "./Image";

import {
  showErrorSnackbar,
  showInfoSnackbar,
  showSuccessSnackbar,
  showWarningSnackbar,
} from "store/actions/ui.action";
// import { LazyLoadImage } from "react-lazy-load-image-component";

const Item = ({
  propsOfItem,
  setCurrentSlide,
  index,
  handleClickOpen,
  deleteItem,
  editItem,
}) => {
  const [caption, setCaption] = useState(propsOfItem.caption);
  const [openForDelete, setOpenForDelete] = useState(false);
  const [openForEdit, setOpenForEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleDelete = async (id, imageId) => {
    setLoading(true);
    await dispatch(deleteItem(id, imageId))
      .then((message) => {
        setOpenForDelete(false);
        dispatch(showInfoSnackbar(message));
      })
      .catch((message) => {
        setOpenForDelete(false);
        dispatch(showErrorSnackbar(message));
      });
    setLoading(false);
  };

  const handleEdit = async (id) => {
    if (!caption) {
      dispatch(showWarningSnackbar("You must write a caption"));
    } else {
      setLoading(true);
      await dispatch(editItem(propsOfItem._id, caption))
        .then((message) => dispatch(showSuccessSnackbar(message)))
        .catch((message) => dispatch(showErrorSnackbar(message)));
      setOpenForEdit(false);
      setLoading(false);
    }
  };

  // console.log(propsOfItem.width, propsOfItem.height);

  return (
    <div
      component={motion.div}
      layout="true"
      className="image-item"
      onClick={() => {
        if (!isLoggedIn) {
          setCurrentSlide(index);
          handleClickOpen();
        }
      }}
    >
      <div>
        <Image propsOfItem={propsOfItem} />
        {/* <Skeleton width={propsOfItem.width} height={propsOfItem.height} /> */}
        <div className="overlay">
          <div className="text">
            <p className="caption">{propsOfItem.caption}</p>
          </div>
          {isLoggedIn && (
            <div className="controls">
              <EditIcon onClick={() => setOpenForEdit(true)} />
              <CloseIcon onClick={() => setOpenForDelete(true)} />
            </div>
          )}
        </div>
      </div>
      {/* for delete */}
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
        maxWidth="xs"
        // TransitionProps={{ onEntering: handleEntering }}
        open={openForDelete}
      >
        <DialogTitle>Delete</DialogTitle>

        <DialogContent dividers>
          <p>Are you sure you want to delete the image?</p>
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
            <Button
              sx={{ color: "#000" }}
              onClick={() => handleDelete(propsOfItem._id, propsOfItem.imageId)}
            >
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
          <p>Edit your caption!</p>
          <form id="edit-form">
            <textarea
              className="caption-input"
              required
              rows={5}
              maxLength={2200}
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
              onClick={() => handleEdit(propsOfItem._id)}
            >
              Ok
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Item;

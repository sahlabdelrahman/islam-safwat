/** @format */

import { useState } from "react";
import { useDispatch } from "react-redux";

import { LazyLoadImage } from "react-lazy-load-image-component";

import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { motion } from "framer-motion";

import { deleteFeatured } from "store/actions/featured.action";
import { showInfoSnackbar, showErrorSnackbar } from "store/actions/ui.action";

const FeaturedItem = ({ propsOfItem }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async (id, imageId) => {
    setLoading(true);
    await dispatch(deleteFeatured(id, imageId))
      .then((message) => {
        handleClose();
        dispatch(showInfoSnackbar(message));
      })
      .catch((message) => {
        handleClose();
        dispatch(showErrorSnackbar(message));
      });
    setLoading(false);
  };

  return (
    <Grid
      component={motion.div}
      layout
      className="featured-item"
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
    >
      <div>
        <LazyLoadImage
          loading="lazy"
          src={propsOfItem.imageUrl}
          alt={propsOfItem.imageId}
          effect="blur"
        />
        <div className="overlay">
          <CloseIcon onClick={handleOpen} />
        </div>
      </div>
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
        maxWidth="xs"
        open={open}
      >
        <DialogTitle>Delete</DialogTitle>

        <DialogContent dividers>
          <p>Are you sure you want to delete the image?</p>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#000" }} onClick={handleClose}>
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
    </Grid>
  );
};

export default FeaturedItem;

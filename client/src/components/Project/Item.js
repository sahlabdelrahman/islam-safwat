/** @format */

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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

// import SocialMediaShare from "components/SocialMediaShare";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "store/actions/ui.action";

const Item = ({ propsOfItem, deleteItem, editItem, text }) => {
  const [title, setTitle] = useState(propsOfItem.title);
  const [description, setDescription] = useState(propsOfItem.description);
  const [openForDelete, setOpenForDelete] = useState(false);
  const [openForEdit, setOpenForEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    setLoading(true);

    await dispatch(deleteItem(propsOfItem._id, propsOfItem.title))
      .then((message) => dispatch(showSuccessSnackbar(message)))
      .catch((message) => dispatch(showErrorSnackbar(message)));
    setLoading(false);
    setOpenForDelete(false);
  };

  const handleEdit = async () => {
    setLoading(true);

    await dispatch(editItem(propsOfItem._id, title, description))
      .then((message) => dispatch(showSuccessSnackbar(message)))
      .catch((message) => dispatch(showErrorSnackbar(message)));
    setLoading(false);
    setOpenForEdit(false);
  };

  return (
    <motion.div layout="true" className="image-item">
      {isLoggedIn ? (
        <div>
          <Image propsOfItem={propsOfItem} />
          <div className="overlay">
            {isLoggedIn && (
              <div className="controls">
                <EditIcon onClick={() => setOpenForEdit(true)} />
                <CloseIcon onClick={() => setOpenForDelete(true)} />
              </div>
            )}
            <Link to={`${propsOfItem._id}`}>
              <div className="title-and-description">
                <h3>{propsOfItem.title}</h3>
                <p>{propsOfItem.description}</p>
              </div>
            </Link>
            {/* {!isLoggedIn && (
            <div className="share-buttons">
              <SocialMediaShare
                url={`islamsafwat.com/#/projects/${propsOfItem._id}`}
                quote={`${propsOfItem.title}`}
              />
            </div>
          )} */}
          </div>
        </div>
      ) : (
        <Link to={`${propsOfItem._id}`}>
          <Image propsOfItem={propsOfItem} />
          <div className="overlay">
            {isLoggedIn && (
              <div className="controls">
                <EditIcon onClick={() => setOpenForEdit(true)} />
                <CloseIcon onClick={() => setOpenForDelete(true)} />
              </div>
            )}
            <div className="title-and-description">
              <h3>{propsOfItem.title}</h3>
              <p>{propsOfItem.description}</p>
            </div>
            {/* {!isLoggedIn && (
            <div className="share-buttons">
              <SocialMediaShare
                url={`islamsafwat.com/#/projects/${propsOfItem._id}`}
                quote={`${propsOfItem.title}`}
              />
            </div>
          )} */}
          </div>
        </Link>
      )}

      {/* for delete */}
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
        maxWidth="xs"
        open={openForDelete}
      >
        <DialogTitle>Delete</DialogTitle>

        <DialogContent dividers>
          <p>Are you sure you want to delete the {text}?</p>
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
        open={openForEdit}
      >
        <DialogTitle>Edit</DialogTitle>

        <DialogContent dividers>
          <p>Edit your title and description</p>
          <form id="edit-form">
            <input
              type="text"
              required
              maxLength={2200}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="caption-input"
              required
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
    </motion.div>
  );
};

export default Item;

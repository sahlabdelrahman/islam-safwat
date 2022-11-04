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
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "store/actions/ui.action";

const TextOfPage = ({ item, deleteText, editText, id }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [text, setText] = useState(item.text);
  const [openForDelete, setOpenForDelete] = useState(false);
  const [openForEdit, setOpenForEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    await dispatch(deleteText(id, item._id))
      .then((message) => dispatch(showSuccessSnackbar(message)))
      .catch((message) => dispatch(showErrorSnackbar(message)));
    setLoading(false);
    setOpenForDelete(false);
  };

  const handleEdit = async () => {
    setLoading(true);

    await dispatch(editText(id, item._id, text))
      .then((message) => dispatch(showSuccessSnackbar(message)))
      .catch((message) => dispatch(showErrorSnackbar(message)));
    setLoading(false);
    setOpenForEdit(false);
  };

  return (
    <>
      <motion.div layout className="item-of-text">
        <div>
          <Typography variant="h5" className="text">
            {item.text}
          </Typography>
          {isLoggedIn && (
            <div className="controls">
              <EditIcon onClick={() => setOpenForEdit(true)} />
              <CloseIcon onClick={() => setOpenForDelete(true)} />
            </div>
          )}
        </div>
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
          <p>Are you sure you want to delete the Text?</p>
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
          <p>Edit a text</p>
          <form id="edit-form">
            <textarea
              className="caption-input"
              required
              rows={5}
              value={text}
              onChange={(e) => setText(e.target.value)}
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

export default TextOfPage;

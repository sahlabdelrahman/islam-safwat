/** @format */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import SimpleButton from "components/Buttons/SimpleButton";
import ReorderContainer from "./ReorderContainer";

import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "store/actions/ui.action";

const Reorder = ({ reorderAction, items, droppableId, id, flag }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [reorderedItems, setReorderedItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setReorderedItems(items);
  }, [items]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleReorder = async () => {
    setLoading(true);
    await dispatch(reorderAction(reorderedItems, id && id))
      .then((message) => dispatch(showSuccessSnackbar(message)))
      .catch((message) => dispatch(showErrorSnackbar(message)));
    setLoading(false);
    handleClose();
  };

  return (
    <div className="reorder">
      <SimpleButton text="Reorder" handleClick={handleOpen} />
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
        maxWidth="xs"
        // TransitionProps={{ onEntering: handleEntering }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Reorder</DialogTitle>

        <DialogContent dividers /* ="paper" */>
          <ReorderContainer
            reorderedItems={reorderedItems}
            setReorderedItems={setReorderedItems}
            droppableId={droppableId}
            flag={flag}
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#000" }} onClick={handleClose}>
            Cancel
          </Button>
          {loading ? (
            <Button disabled>Loading...</Button>
          ) : (
            <Button sx={{ color: "#000" }} onClick={() => handleReorder()}>
              Save new order
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Reorder;

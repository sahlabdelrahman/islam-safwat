/** @format */

import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { clearSnackbar } from "../../store/actions/ui.action";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const WarningSnackbar = () => {
  const dispatch = useDispatch();

  const { warningSnackbarMessage, warningSnackbarOpen } = useSelector(
    (state) => state.ui
  );

  function handleClose() {
    dispatch(clearSnackbar());
  }

  return (
    <Snackbar
      open={warningSnackbarOpen}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
        {warningSnackbarMessage}
      </Alert>
    </Snackbar>
  );
};

export default WarningSnackbar;

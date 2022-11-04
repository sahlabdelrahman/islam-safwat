/** @format */

import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { clearSnackbar } from "../../store/actions/ui.action";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ErrorSnackbar = () => {
  const dispatch = useDispatch();

  const { errorSnackbarMessage, errorSnackbarOpen } = useSelector(
    (state) => state.ui
  );

  function handleClose() {
    dispatch(clearSnackbar());
  }

  return (
    <Snackbar
      open={errorSnackbarOpen}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {errorSnackbarMessage}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;

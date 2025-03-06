import React from "react";
import { Snackbar, Alert, Slide } from "@mui/material";

const ErrorSnackBar = ({ snackbarOpen, snackbarMessage }) => {
  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={1500}
      slots={{ transition: Slide }}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackBar;

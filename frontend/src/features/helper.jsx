// src/helpers/snackbarHelper.js

export const triggerSnackbar = (
  setSnackbarOpen,
  setSnackbarMessage,
  message,
  duration = 1500
) => {
  setSnackbarOpen(true);
  setSnackbarMessage(message);
  setTimeout(() => {
    setSnackbarOpen(false);
  }, duration);
};

import React, { useState } from "react";
import { IconButton, Snackbar, Slide, Alert, Tooltip } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { transcribeApis } from "../../services/transcribeApi";

const VisuallyHiddenInput = styled("input")({
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  border: 0,
});

const Upload = () => {
  // loading to prevent user from uploading files while the current batch is being processed
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarQueue, setSnackbarQueue] = useState([]);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Calls the transcribeApi service and adds result messages to the queue
  const handleFileChangeAndUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    setLoading(true);
    try {
      const result = await transcribeApis.postTranscribe(formData);
      const messages = [];
      if (result.transcribed && result.transcribed.length) {
        result.transcribed.forEach((file) =>
          messages.push(`${file} transcribed`)
        );
      }
      if (result.exists && result.exists.length) {
        result.exists.forEach((file) =>
          messages.push(`${file} already exists`)
        );
      }
      messages[0].includes("transcribed")
        ? setSnackbarSeverity("success")
        : setSnackbarSeverity("info");

      setSnackbarQueue(messages.slice(1));
      setSnackbarMessage(messages[0]);
    } catch (error) {
      setSnackbarMessage(`Upload failed: ${error.message}`);
      setSnackbarSeverity("error");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
      // Reset value here so subsequent uploads can work
      e.target.value = "";
    }
  };

  // Displays remaining messages after 1st snackbar closes
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    if (snackbarQueue.length > 0) {
      if (snackbarQueue[0].includes("exists")) {
        setSnackbarSeverity("info");
      }
      setTimeout(() => {
        setSnackbarMessage(snackbarQueue[0]);
        setSnackbarQueue(snackbarQueue.slice(1));
        setSnackbarOpen(true);
      }, 100);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center relative">
      <Tooltip title="Transcribe audio files (single/batched)">
        <IconButton
          color="secondary"
          size="large"
          loading={loading}
          component="label"
        >
          <VisuallyHiddenInput
            type="file"
            accept="audio/*"
            onChange={handleFileChangeAndUpload}
            multiple
          />
          <CloudUploadIcon />
        </IconButton>
      </Tooltip>
      <Snackbar
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        autoHideDuration={1500}
        slots={{ transition: Slide }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Upload;

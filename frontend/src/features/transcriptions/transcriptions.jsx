import React, { useState } from "react";
import { IconButton, Tooltip, Snackbar, Alert, Slide } from "@mui/material";
import { transcribeApis } from "../../services/transcribeApi";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Transcriptions = ({ setTableData }) => {
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchAllTranscriptions = async () => {
    const handleCloseSnackbar = ({ message }) => {
      setSnackbarOpen(true);
      setSnackbarMessage(message);
      setTimeout(() => {
        setSnackbarOpen(false);
      }, 1500);
    };

    setLoading(true);
    try {
      const result = await transcribeApis.getTranscriptions();
      if (result.length == 0) {
        handleCloseSnackbar({ message: "No transcripts in Database" });
      }
      setTableData(result);
    } catch (error) {
      handleCloseSnackbar({ message: "Failed to fetch transcripts" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Tooltip title="View All Transcripts">
        <IconButton
          onClick={fetchAllTranscriptions}
          loading={loading}
          color="secondary"
          size="large"
        >
          <VisibilityIcon />
        </IconButton>
      </Tooltip>
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
    </div>
  );
};

export default Transcriptions;

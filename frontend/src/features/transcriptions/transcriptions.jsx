import React, { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { transcribeApis } from "../../services/transcribeApi";
import { triggerSnackbar } from "../helper";
import ErrorSnackBar from "../../components/errorSnackBar";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Transcriptions = ({ setTableData }) => {
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCloseSnackbar = (message) => {
    triggerSnackbar(setSnackbarOpen, setSnackbarMessage, message, 1500);
  };

  const fetchAllTranscriptions = async () => {
    setLoading(true);
    try {
      const result = await transcribeApis.getTranscriptions();
      if (result.length == 0) {
        handleCloseSnackbar("Database is currently empty");
      }
      setTableData(result);
    } catch (error) {
      handleCloseSnackbar("Failed to fetch transcripts");
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
      <ErrorSnackBar
        snackbarOpen={snackbarOpen}
        snackbarMessage={snackbarMessage}
      />
    </div>
  );
};

export default Transcriptions;

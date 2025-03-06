import React, { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { transcribeApis } from "../../services/transcribeApi";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Transcriptions = ({ setTableData }) => {
  const [loading, setLoading] = useState(false);
  const fetchAllTranscriptions = async () => {
    setLoading(true);
    try {
      const result = await transcribeApis.getTranscriptions();
      setTableData(result);
    } catch (error) {
      console.error("Error fetching transcriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* <Button
        variant="contained"
        color="primary"
        onClick={fetchAllTranscriptions}
        disabled={loading}
      >
        View All
      </Button> */}
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
    </div>
  );
};

export default Transcriptions;

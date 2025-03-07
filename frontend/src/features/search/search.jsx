import React, { useState } from "react";
import { TextField } from "@mui/material";
import { transcribeApis } from "../../services/transcribeApi";
import { triggerSnackbar } from "../helper";
import ErrorSnackBar from "../../components/errorSnackBar";

const Search = ({ setTableData }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [error, setError] = useState(false);

  const handleCloseSnackbar = (message) => {
    triggerSnackbar(setSnackbarOpen, setSnackbarMessage, message, 1500);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const result = await transcribeApis.searchTranscriptions(query);
      result.length == 0
        ? handleCloseSnackbar(
            "No transcripts with this filename exist in this database"
          )
        : setTableData(result);
    } catch (error) {
      handleCloseSnackbar("Unable to search currently");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center rounded ">
      <TextField
        label="Search Filename [Enter↵]"
        variant="outlined"
        color="secondary"
        error={error}
        value={query}
        disabled={loading}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          // Only proceed if query is not empty
          if (e.key === "Enter" && query.trim()) {
            handleSearch();
            setError(false);
          } else if (e.key == "Enter") {
            setError(true);
          }
        }}
        fullWidth
      />
      <ErrorSnackBar
        snackbarOpen={snackbarOpen}
        snackbarMessage={snackbarMessage}
      />
    </div>
  );
};

export default Search;

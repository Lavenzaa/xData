import React, { useState } from "react";
import { TextField } from "@mui/material";

const Search = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    // TODO: Connect to your API to perform search
    console.log("Searching for:", query);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white rounded shadow-lg shadow-purple-200">
      <TextField
        label="Enter Filename"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth="true"
      />
    </div>
  );
};

export default Search;

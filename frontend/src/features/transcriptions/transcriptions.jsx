import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Transcriptions = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // TODO: Fetch transcriptions from your backend API
    setData([
      { id: 1, fileName: "audio1.mp3", transcription: "Hello world!" },
      { id: 2, fileName: "audio2.mp3", transcription: "React is awesome!" },
    ]);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="transcriptions table">
        <TableHead>
          <TableRow>
            <TableCell>File Name</TableCell>
            <TableCell>Transcription</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.fileName}</TableCell>
              <TableCell>{row.transcription}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Transcriptions;

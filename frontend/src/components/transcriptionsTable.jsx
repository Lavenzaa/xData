import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from "@mui/material";

// Sort function utility
const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const TranscriptionsTable = ({ data }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("file_name");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = [...data].sort(getComparator(order, orderBy));

  return (
    <TableContainer component={Paper} className="mt-4">
      <Table>
        <TableHead style={{ backgroundColor: "blueviolet" }}>
          <TableRow>
            {["file_name", "transcribed_text", "created_at (UTC)"].map(
              (column) => (
                <TableCell
                  key={column}
                  style={{ color: "white", borderBottom: "1px solid #ccc" }}
                >
                  <TableSortLabel
                    active={orderBy === column}
                    direction={orderBy === column ? order : "asc"}
                    onClick={(event) => handleRequestSort(event, column)}
                  >
                    {column.replace("_", " ").toUpperCase()}
                  </TableSortLabel>
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.file_name}</TableCell>
              <TableCell>{item.transcribed_text}</TableCell>
              <TableCell>{item.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TranscriptionsTable;

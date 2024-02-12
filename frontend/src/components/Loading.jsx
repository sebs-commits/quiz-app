import React from "react";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
}

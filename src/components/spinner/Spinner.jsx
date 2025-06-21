import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Spinner = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default Spinner;

import React from "react";
import ChatBox from "./ChatBoxComponent";
import { Box } from "@mui/material";

const index = () => {
  return (
    <Box
      sx={{
        p: 5,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
      }}
    >
      <ChatBox />
    </Box>
  );
};

export default index;

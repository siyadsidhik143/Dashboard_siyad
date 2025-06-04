"use client";

import { AppBar, Toolbar, Typography } from "@mui/material";
import { SidebarDrawerWidth } from "../utils/Constants";

export default function Header() {
  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{
        width: `calc(100% - ${SidebarDrawerWidth}px)`,
        ml: `${SidebarDrawerWidth}px`,
        backgroundColor: "#2e7d32",
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          CRM Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

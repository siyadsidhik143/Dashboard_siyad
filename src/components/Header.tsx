"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import { SidebarDrawerWidth } from "../utils/Constants";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import ProfileOptions from "@/utils/ProfileOptions";

export default function Header() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openProfileMenu = Boolean(anchorEl);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    //setAnchorEl is a type of reference as menu option is
    // open during the user clicks on profile icon
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${SidebarDrawerWidth}px)`,
        ml: `${SidebarDrawerWidth}px`,
        backgroundColor: "#ffffff",
        boxShadow: "none",
        borderBottom: "1px solid #e3e3e3",
      }}
    >
      <Toolbar>
        {/* Left Side: Title */}
        <Typography variant="h6" noWrap component="div" color="black">
          Dashboard
        </Typography>

        {/* Spacer to push icons to the right */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Right Side: Icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
          <IconButton size="large" sx={{ color: theme.palette.primary.main }}>
            <NotificationsIcon />
          </IconButton>
          <IconButton size="large" sx={{ color: theme.palette.primary.main }}>
            <SettingsIcon />
          </IconButton>
          <Tooltip title="User Profile">
            <IconButton
              onClick={handleAvatarClick}
              sx={{ color: theme.palette.primary.main }}
            >
              <AccountCircleIcon sx={{ width: 32, height: 32 }} />
            </IconButton>
          </Tooltip>
          <ProfileOptions
            anchorEl={anchorEl}
            handleMenuClose={handleMenuClose}
            openProfileMenu={openProfileMenu}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

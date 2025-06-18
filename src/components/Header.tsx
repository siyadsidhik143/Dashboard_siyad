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
import { Search as SearchIcon } from "@mui/icons-material";

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
        minHeight: "10vh",
      }}
    >
      <Toolbar>
        {/* Left Side: Title */}
        {/* <Typography variant="h6" noWrap component="div" color="black">
          Dashboard
        </Typography> */}
        <Box sx={{ position: "relative" }}>
          <SearchIcon
            sx={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "text.secondary",
            }}
          />
          <input
            type="text"
            placeholder="Search project, folder or file"
            style={{
              width: "100%",
              padding: "12px 16px 12px 40px",
              borderRadius: "8px",
              border: "1px solid #e0e0e0",
              fontSize: "14px",
              outline: "none",
            }}
          />
        </Box>

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

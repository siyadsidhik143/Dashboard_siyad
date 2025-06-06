"use client";

import React from "react";
import {
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Typography,
  Box,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { removeAccessToken } from "./functions";

interface ProfileOptionsProps {
  anchorEl: null | HTMLElement;
  handleMenuClose: () => void;
  openProfileMenu: boolean;
}

const ProfileOptions: React.FC<ProfileOptionsProps> = ({
  anchorEl,
  handleMenuClose,
  openProfileMenu,
}) => {
  const router = useRouter();
  const handleLogout = (event: any) => {
    event.preventDefault();
    removeAccessToken();
    handleMenuClose();
    router.push("/login");
  };
  return (
    <Menu
      anchorEl={anchorEl}
      open={openProfileMenu}
      onClose={handleMenuClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
          mt: 1,
          minWidth: 180,
          borderRadius: 2,
          boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Box px={2} py={1.5}>
        <Typography variant="subtitle2" color="text.secondary">
          User Options
        </Typography>
      </Box>
      <Divider />

      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">Profile</Typography>
      </MenuItem>

      <MenuItem onClick={handleMenuClose}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">Settings</Typography>
      </MenuItem>

      <Divider />

      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">Logout</Typography>
      </MenuItem>
    </Menu>
  );
};

export default ProfileOptions;

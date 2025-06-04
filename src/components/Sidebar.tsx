"use client";

import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import EmailIcon from "@mui/icons-material/Email";
import TaskIcon from "@mui/icons-material/Task";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FolderIcon from "@mui/icons-material/Folder";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { SidebarDrawerWidth } from "@/utils/Constants";

const menuItems = [
  { label: "Client List", icon: <PeopleIcon /> },
  { label: "Call Log", icon: <ListAltIcon /> },
  { label: "Email Log", icon: <EmailIcon /> },
  { label: "Task List", icon: <TaskIcon /> },
  { label: "Calendar", icon: <CalendarMonthIcon /> },
  { label: "Project List", icon: <FolderIcon /> },
  { label: "Meeting List", icon: <MeetingRoomIcon /> },
];

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SidebarDrawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: SidebarDrawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#fff",
          borderRight: "1px solid #ddd",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List sx={{ pb: 5 }}>
          {menuItems.map(({ label, icon }) => (
            <ListItemButton key={label}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

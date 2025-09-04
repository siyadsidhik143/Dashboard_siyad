"use client";

import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import EmailIcon from "@mui/icons-material/Email";
import TaskIcon from "@mui/icons-material/Task";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FolderIcon from "@mui/icons-material/Folder";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { SidebarDrawerWidth } from "@/utils/Constants";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter, usePathname } from "next/navigation"; // or next/router for older Next.js versions
import AppleIcon from "../assets/Images/apple.png";
import LogoIcon from "../assets/Images/apple.png";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

const menuItems = [
  {
    label: "Dashboard",
    icon: <HomeIcon />,
    path: "/dashboard",
    exact: true, // Only match exactly this path
  },
  {
    label: "Dashboard2",
    icon: <HomeIcon />,
    path: "/dashboard2",
    exact: true, // Only match exactly this path
  },
  {
    label: "Users List",
    icon: <PersonIcon />,
    path: "/userslist",
    subPaths: ["/userslist", "/userslist/view", "/userslist/edit"], // Will match any of these
  },
  {
    label: "Client List",
    icon: <PeopleIcon />,
    path: "/clients",
    subPaths: ["/clients", "/client/view", "/client/edit"], // Will match any of these
  },
  {
    label: "Study",
    icon: <PeopleIcon />,
    path: "/study",
    subPaths: ["/study", "/study/view", "/study/edit"], // Will match any of these
  },

  // {
  //   label: "Call Log",
  //   icon: <ListAltIcon />,
  //   path: "/calls",
  //   subPaths: ["/calls", "/call/view", "/call/create"],
  // },
  // {
  //   label: "Email Log",
  //   icon: <EmailIcon />,
  //   path: "/emails",
  //   subPaths: ["/emails", "/email/view"],
  // },
  {
    label: "Task List",
    icon: <TaskIcon />,
    path: "/tasks",
    subPaths: ["/tasks", "/task/view", "/task/edit"],
  },
  // {
  //   label: "Calendar",
  //   icon: <CalendarMonthIcon />,
  //   path: "/calendar",
  //   exact: true,
  // },
  {
    label: "Project List",
    icon: <FolderIcon />,
    path: "/projects",
    subPaths: ["/projects", "/project/view", "/project/edit"],
  },

  {
    label: "E-Commerce",
    icon: <ShoppingCartCheckoutIcon />,
    path: "/ecommerce",
    subPaths: ["/ecommerce", "/project/view", "/project/edit"],
  },
  // {
  //   label: "Meeting List",
  //   icon: <MeetingRoomIcon />,
  //   path: "/meetings",
  //   subPaths: ["/meetings", "/meeting/view", "/meeting/create"],
  // },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
      }}
    >
      {/* Logo Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          py: 2,
          pl: 4,
          width: "100%",
        }}
      >
        <img src={LogoIcon.src} alt="CRM Logo" height={30} width={30} />
        <Typography
          variant="h6"
          fontSize={17}
          fontWeight={600}
          color="text.primary"
          mt={1}
          ml={1}
        >
          Siyad's App
        </Typography>
      </Box>

      {/* <Toolbar sx={{ maxHeight: "2vh" }} /> */}

      {/* Menu List */}
      <Box
        className="custom-scrollbar"
        sx={{
          overflowY: "auto",
          width: "100%",
          px: 1,
          mt: 2,
          scrollbarWidth: "thin",
        }}
      >
        <List>
          {menuItems.map(({ label, icon, path }, index) => (
            <ListItemButton
              key={index}
              onClick={() => router.push(path)}
              sx={{
                mb: 1,
                borderRadius: 2,
                mx: 1,
                backgroundColor: pathname === path ? "#e3f2fd" : "transparent",
                "&:hover": {
                  backgroundColor: pathname === path ? "#e3f2fd" : "#f5f5f5",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: pathname === path ? "primary.main" : "inherit",
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

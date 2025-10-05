"use client";
import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import LoginDialog from "../Ecommerce/LoginDialog"; // import dialog

export default function EcommerceHeader() {
  const [openLogin, setOpenLogin] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const categories = ["Electronics", "Fashion", "Home", "Beauty", "Sports"];

  return (
    <>
      <AppBar position="sticky" sx={{ background: "#2874f0" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, cursor: "pointer", flexShrink: 0 }}
          >
            ShopKart
          </Typography>

          {/* Categories - hidden on mobile */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {categories.map((item) => (
              <Typography
                key={item}
                sx={{ cursor: "pointer", fontSize: "0.95rem" }}
              >
                {item}
              </Typography>
            ))}
          </Box>

          {/* Right Side Actions */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, md: 2 },
              flexShrink: 0,
            }}
          >
            {/* Search Bar */}
            <Box
              sx={{
                background: "white",
                px: 1.5,
                py: 0.5,
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                width: { xs: "120px", sm: "180px", md: "250px" },
              }}
            >
              <SearchIcon sx={{ color: "gray", mr: 1 }} />
              <InputBase placeholder="Search..." sx={{ width: "100%" }} />
            </Box>

            {/* Cart */}
            <IconButton color="inherit">
              <ShoppingCartIcon />
            </IconButton>

            {/* Login */}
            <Button
              variant="contained"
              sx={{
                bgcolor: "white",
                color: "#2874f0",
                textTransform: "none",
                px: { xs: 1, md: 2 },
              }}
              onClick={() => setOpenLogin(true)}
            >
              Login
            </Button>

            {/* Hamburger Menu (only on mobile) */}
            <IconButton
              sx={{ display: { xs: "inline-flex", md: "none" } }}
              color="inherit"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Categories */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List sx={{ width: 250 }}>
          {categories.map((item) => (
            <ListItemButton key={item}>
              <ListItemText primary={item} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Login Dialog */}
      <LoginDialog open={openLogin} onClose={() => setOpenLogin(false)} />
    </>
  );
}

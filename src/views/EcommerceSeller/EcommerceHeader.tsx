import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import InputBase from "@mui/material/InputBase";
import LoginDialog from "../Ecommerce/LoginDialog"; // import dialog

export default function EcommerceHeader() {
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <>
      <AppBar position="sticky" sx={{ background: "#2874f0" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, cursor: "pointer" }}>
            ShopKart
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {["Electronics", "Fashion", "Home", "Beauty", "Sports"].map(
              (item) => (
                <Typography
                  key={item}
                  sx={{ cursor: "pointer", fontSize: "0.95rem" }}
                >
                  {item}
                </Typography>
              )
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                background: "white",
                px: 2,
                py: 0.5,
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                width: { xs: "150px", md: "250px" },
              }}
            >
              <SearchIcon sx={{ color: "gray", mr: 1 }} />
              <InputBase
                placeholder="Search products..."
                sx={{ width: "100%" }}
              />
            </Box>

            <IconButton color="inherit">
              <ShoppingCartIcon />
            </IconButton>

            {/* ✅ Login Button */}
            <Button
              variant="contained"
              sx={{ bgcolor: "white", color: "#2874f0", textTransform: "none" }}
              onClick={() => setOpenLogin(true)}
            >
              Login
            </Button>

            <IconButton sx={{ display: { md: "none" } }} color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Login Dialog */}
      <LoginDialog open={openLogin} onClose={() => setOpenLogin(false)} />
    </>
  );
}

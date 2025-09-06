"use client";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginDialog({ open, onClose }: LoginDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: "16px", overflow: "hidden" },
      }}
    >
      <DialogContent sx={{ display: "flex", p: 0 }}>
        {/* Left Section */}
        <Box
          sx={{
            flex: 1,
            background: "linear-gradient(135deg, #0076ca, #7c90ff)",
            color: "white",
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Simplify management with our dashboard.
          </Typography>
          <Typography variant="body2" textAlign="center" maxWidth={300}>
            Simplify your e-commerce management with our user-friendly admin
            dashboard.
          </Typography>

          <Box
            component="img"
            src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg"
            alt="Illustration"
            sx={{ width: "75%", mt: 4, borderRadius: 2 }}
          />
        </Box>

        {/* Right Section */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: 4,
            position: "relative",
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", top: 16, right: 16 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h5" fontWeight="bold">
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Please login to your account
          </Typography>

          <TextField
            label="Email address"
            type="email"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
          />

          <Typography
            variant="body2"
            color="primary"
            sx={{ textAlign: "right", cursor: "pointer", mb: 2 }}
          >
            Forgot password?
          </Typography>

          <Button
            variant="contained"
            fullWidth
            sx={{
              background: "linear-gradient(135deg, #2e9eee, #6f83f6)",
              py: 1.2,
              fontWeight: "bold",
              textTransform: "none",
              mb: 3,
              "&:hover": {
                background: "linear-gradient(135deg, #0076ca, #7c90ff)",
              },
            }}
          >
            Login
          </Button>

          <Divider>Or Login with</Divider>

          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{ flex: 1, textTransform: "none" }}
            >
              Google
            </Button>
            <Button
              variant="outlined"
              startIcon={<FacebookIcon />}
              sx={{ flex: 1, textTransform: "none" }}
            >
              Facebook
            </Button>
          </Box>

          <Typography
            variant="body2"
            textAlign="center"
            mt={3}
            sx={{ cursor: "pointer" }}
          >
            Don’t have an account?{" "}
            <span style={{ color: "#ff7e5f" }}>Signup</span>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

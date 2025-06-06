"use client";

import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { setAccessToken } from "@/utils/functions";
import { useRouter } from "next/navigation";

export default function LoginPage({
  setIsAuthenticated,
}: {
  setIsAuthenticated?: (val: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAccessToken(`siyads_secret_token`);
    router.push("/dashboard");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #f4f5fa, #e0e7ff)",
        p: 2,
      }}
    >
      <Card
        elevation={3}
        sx={{
          p: 5,
          maxWidth: 420,
          width: "100%",
          borderRadius: 3,
          boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
        }}
      >
        <Typography variant="h4" textAlign="center" mb={4} fontWeight={600}>
          Sign In
        </Typography>

        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            // required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            // required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <Button type="submit" variant="contained" size="large" fullWidth>
            Login
          </Button>

          <Typography variant="body2" textAlign="center" mt={2}>
            Don't have an account?{" "}
            <Link
              href="/register"
              style={{
                color: "#1976d2",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Register
            </Link>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

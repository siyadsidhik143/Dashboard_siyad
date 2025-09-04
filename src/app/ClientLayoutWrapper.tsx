// components/ClientLayoutWrapper.tsx
"use client";

import { useEffect, useState } from "react";
import { CssBaseline } from "@mui/material";
import ThemeProvider from "@/assets/styles/ThemeProvider";
import App from "../app/App";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted ? (
        <ThemeProvider>
          <CssBaseline />
          <App>{children}</App>
        </ThemeProvider>
      ) : (
        <div style={{ visibility: "hidden" }}>
          <ThemeProvider>
            <CssBaseline />
            <App>{children}</App>
          </ThemeProvider>
        </div>
      )}
    </>
  );
}

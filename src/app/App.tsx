// // File: app/App.tsx
// "use client";

// import { useState } from "react";
// import { usePathname } from "next/navigation";
// import LoginPage from "./login/page";

// export default function App({ children }: { children: React.ReactNode }) {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const pathname = usePathname();

//   const isAuthPage = pathname === "/login";

//   if (!isAuthenticated && !isAuthPage) {
//     return <LoginPage setIsAuthenticated={setIsAuthenticated} />;
//   }

//   return <>{children}</>;
// }

// // app/App.tsx
"use client";

import { usePathname } from "next/navigation";
import LoginPage from "./login/page";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Box, Toolbar } from "@mui/material";

export default function App({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  if (isLoginPage) {
    return <LoginPage />;
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: "#f4f5fa",
            minHeight: "100vh",
          }}
        >
          <Header />
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  );
}

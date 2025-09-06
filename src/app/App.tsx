"use client";

import { usePathname } from "next/navigation";
import LoginPage from "./login/page";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Box, Toolbar } from "@mui/material";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../app/library/ReduxStore";
import EcommerceHeader from "@/views/EcommerceSeller/EcommerceHeader";

export default function App({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const isEcommerce =
    pathname.startsWith("/ecommerce") || pathname.startsWith("/product");
  const isEcommerceSeller = pathname.startsWith("/seller");
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  if (isLoginPage) {
    return <LoginPage />;
  }

  return (
    <>
      <Provider store={storeRef.current}>
        {isEcommerce || isEcommerceSeller ? (
          <>
            <EcommerceHeader />
            {children}
          </>
        ) : (
          <Box sx={{ display: "flex" }}>
            <Sidebar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                backgroundColor: "#f4f5fa",
              }}
            >
              <Header />
              <Toolbar />
              {children}
            </Box>
          </Box>
        )}
      </Provider>
    </>
  );
}

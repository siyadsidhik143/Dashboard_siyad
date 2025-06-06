// app/layout.tsx
import "./globals.css";
import { CssBaseline } from "@mui/material";
import ThemeProvider from "@/assets/styles/ThemeProvider";
import "../assets/styles/custom_styles.css";
import App from "./App";

export const metadata = {
  title: "CRM Dashboard",
  description: "Next.js CRM UI with MUI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <CssBaseline />
          <App>{children}</App>
        </ThemeProvider>
      </body>
    </html>
  );
}

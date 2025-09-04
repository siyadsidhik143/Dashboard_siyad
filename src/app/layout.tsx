// app/layout.tsx
import "./globals.css";
import "../assets/styles/custom_styles.css";
import ClientLayoutWrapper from "./ClientLayoutWrapper";

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
      <body suppressHydrationWarning={true}>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}

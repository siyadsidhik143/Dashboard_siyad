import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5", // Replace with your desired primary color
      light: "#757de8", // Lighter variant
      dark: "#002984", // Darker variant
      contrastText: "#fff", // Text color that contrasts with primary
    },
    // You can customize other palette colors too
    secondary: {
      main: "#f50057",
    },
  },
  // You can also customize typography, spacing, etc.
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;

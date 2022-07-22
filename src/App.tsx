import ThemeProvider from "@mui/material/styles/ThemeProvider";
import React from "react";
import { ToastContainer } from "react-toastify";
import theme from "./ConfigTheme/configTheme";
import Router from "./Router";

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Router></Router>
      </ThemeProvider>
      <ToastContainer />
    </React.StrictMode>
  );
}

export default App;

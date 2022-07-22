import { createTheme } from "@mui/material/styles";
// the theme to accept the custom values.
declare module "@mui/material/styles" {
  interface Palette {
    green: Palette["primary"];
    default: Palette["primary"];
    black: Palette["primary"];
  }
  interface PaletteOptions {
    green: PaletteOptions["primary"];
    default: PaletteOptions["primary"];
    black: PaletteOptions["primary"];
  }
}
// Update the Button's color prop options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    green: true;
    default: true;
    black: true;
  }
}

const paletteColor = {
  primaryMain: "#2196f3",
  sencondatyMain: "#ff5722",
  errorMain: "#ff1744",
  greenMain: "#2e7d32",
  blackMain: "#06283D",
  default: "#9e9e9e",
};

const theme = createTheme({
  palette: {
    primary: {
      main: paletteColor.primaryMain,
    },
    secondary: {
      main: paletteColor.sencondatyMain,
    },
    error: {
      main: paletteColor.errorMain,
    },
    green: {
      main: paletteColor.greenMain,
      contrastText: "#fff",
    },
    default: {
      main: paletteColor.default,
    },
    black: {
      main: paletteColor.blackMain,
      contrastText: "#fff",
    },
  },
});

export default theme;

import { createMuiTheme, ThemeOptions } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export const paletteColorsDark = {
  primary: "#0f4c75",
  secondary: "#3282b8",
  error: "#E44C65",
  background: "#1b262c",
  text: "#bbe1fa",
};

export const paletteColorsLight = {
  primary: "#6886c5",
  secondary: "#ffe0ac",
  error: "#E44C65",
  background: "#f9f9f9",
  text: "#050505",
};

const options = (dark: boolean): ThemeOptions => {
  const paletteColors = dark ? paletteColorsDark : paletteColorsLight;
  return {
    palette: {
      type: dark ? "dark" : "light",
      primary: {
        main: paletteColors.primary,
      },
      secondary: {
        main: paletteColors.secondary,
      },
      error: {
        main: paletteColors.error,
      },
      background: {
        default: paletteColors.background,
      },
      text: {
        primary: paletteColors.text,
      },
    },
  };
};

export const darkTheme = createMuiTheme(options(true));
export const lightTheme = createMuiTheme(options(false));

export const useStyles = makeStyles(() => ({
  text: {
    marginLeft: 10,
    fontSize: 22,
    whiteSpace: "pre-wrap",
    borderBottom: "solid",
  },
  description: {
    marginLeft: 10,
    fontSize: 18,
    whiteSpace: "pre-wrap",
  },
  card: {
    marginTop: 50,
    marginLeft: 30,
    backgroundColor: "white",
  },
  wordCard: {
    backgroundColor: "white",
  },
}));

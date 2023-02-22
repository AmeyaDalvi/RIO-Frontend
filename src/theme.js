import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    inputText: {
      "& label.Mui-focused": {
        color: "#832BE0",
      },
      "& .MuiFilledInput-underline:after": {
        borderBottomColor: "#832BE0",
      },
    },
  },
});

export default theme;

import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    button: {
      textTransform: "none"
    }
  },
  palette: {
    type: "light",
    primary: {
      main: "#4202ff"
    }
  }
});

export default theme;
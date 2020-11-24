import "./App.css";
import { render } from "react-dom";
import theme from "./theme";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import BoilerHeader from "./components/BoilerHeader";
import BoilerGalleryContainer from "./components/BoilerGalleryContainer";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <body>
        <BoilerHeader />
      </body >
    </MuiThemeProvider>
  )
}

export default App;

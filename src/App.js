import "./App.css";
import { SnackbarProvider } from 'notistack'; import theme from "./theme";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import BoilerHeader from "./components/BoilerHeader";
import BoilerGalleryContainer from "./components/BoilerGalleryContainer";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <body>
          <BoilerHeader />
          <BoilerGalleryContainer />
        </body>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
}

export default App;

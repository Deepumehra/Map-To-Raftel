import { ThemeProvider, createTheme } from '@mui/material/styles';
import LoginComponent from './Components/LoginComponent/Login';


function App() {

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <LoginComponent />
    </ThemeProvider>
  );
}

export default App;

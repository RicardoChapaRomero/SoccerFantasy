import { createTheme } from '@mui/material/styles';
import colors from './colors';
const theme = createTheme({
  palette: {
    primary: {
      main: colors.yellow
    },
    secondary: {
      main: colors.secondaryGreen
    },
    error: {
      main: colors.red
    },
    info: {
      main: colors.blue
    },
    success: {
      main: colors.primaryGreen
    }
  }
});

export default theme;

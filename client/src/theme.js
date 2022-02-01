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
    },
    warning: {
      main: colors.white
    }
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        input: {
          '&:-webkit-autofill': {
            '-webkit-box-shadow': '0 0 0 100px #e8e8cc inset'
          }
        }
      }
    }
  }
});

export default theme;

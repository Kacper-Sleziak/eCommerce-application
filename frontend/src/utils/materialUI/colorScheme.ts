import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    // white
    primary: {
      main: '#ffffff',
    },
    secondary: {
      // blue
      main: '#14213d',
    },
    success: {
      // yellow
      main: '#fca311',
    },
    error: {
      // black
      main: '#ff0000',
    },
    warning: {
      // darker grey
      main: '#e5e5e5',
    },
    info: {
      // lighter grey
      main: '#ecebeb',
    },
  },
})

export default theme

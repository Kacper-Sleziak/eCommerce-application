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
    error: {
      // black
      main: '#ff0000',
    },
    warning: {
      // darker grey
      main: '#adadad',
    },
    info: {
      // lighter grey
      main: '#ecebeb',
    },
  },
})

export default theme

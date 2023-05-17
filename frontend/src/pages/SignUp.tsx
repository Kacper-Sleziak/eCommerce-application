import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../utils/materialUI/colorScheme'
import { useSignUpMutation } from '../store/services/UserDataApi'
import { useEffect, useState } from 'react'
import ConfirmationMessageSnackbar from '../components/sharedComponents/ConfirmationMessageSnackbar'

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="http://127.0.0.1/">
        ItApps
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  )
}

const SignUp = () => {
  const [signUp, signUpResult] = useSignUpMutation()
  const [userMessage, setUserMessage] = useState<string>("")

  useEffect(() => {
    console.log(signUpResult);

    if (signUpResult.isSuccess && !userMessage) {
      setUserMessage("Logged in successfully")

    }

    if (signUpResult.isError && !userMessage) {
      setUserMessage(`Something went wrong: ${signUpResult.error?.data?.detail}`);
    }

    if (signUpResult.isLoading) {
      setUserMessage("")
    }
  }, [signUpResult])
  // const [signUpData, updateSignUpData] = React.useReducer(
  //   (state, action) => {
  //     const updateData = { ...state }

  //     switch (action.type) {
  //       case "username": 
  //       break
  //       case "email":
  //       break
  //       case "password":
  //       break
  //       case "role_id":
  //       break
  //       case "address_id":
  //       break
  //       default:
  //         return updateData
  //     }
  //     return updateData
  //   },
  //   {
  //     username: "",
  //     email: "",
  //     password: "",

  //   }
  // )



  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const username = data.get('username');
    const role_id = 1;
    const address_id = 1;

    console.log(data.get('email'));
    console.log(data.get('password'));
    console.log(data.get('username'));

    signUp({
      body: {
        username,
        email,
        password,
        role_id,
        address_id
      }
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="name-textfield"
                  label="name"
                  autoFocus
                  color="error"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email-textfield"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  color="error"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  color="error"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="error" />
                  }
                  label="I agree to terms and conditions*"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        <ConfirmationMessageSnackbar message={userMessage} severity="error" />
      </Container>

    </ThemeProvider >
  )
}

export default SignUp

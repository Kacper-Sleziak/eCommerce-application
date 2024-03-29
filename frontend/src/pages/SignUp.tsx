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
import { useEffect, useState } from 'react'
import PasswordStrengthBar from 'react-password-strength-bar'
import theme from '../utils/materialUI/colorScheme'
import { useSignUpMutation } from '../store/services/UserDataApi'
import ConfirmationMessageSnackbar from '../components/sharedComponents/ConfirmationMessageSnackbar'

const isEmailValid = (email: string) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  return email !== '' ? emailRegex.test(email) : true
}

const isSignUpFormValid = (
  username: string,
  password: string,
  email: string,
) => {
  if (
    username !== '' &&
    password !== '' &&
    email !== '' &&
    isEmailValid(email)
  ) {
    return true
  }
  return false
}

interface AlertProps {
  severity: 'error' | 'info' | 'warning' | 'success'
}

const SignUp = () => {
  const [signUp, signUpResult] = useSignUpMutation()
  const [userMessage, setUserMessage] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [severity, setSeverity] = useState<AlertProps['severity']>('info')

  useEffect(() => {
    if (signUpResult.isSuccess && userMessage === '') {
      setSeverity('success')
      setUserMessage('Signed up successfully')
    }

    if (signUpResult.isError && userMessage === '') {
      // @ts-expect-error
      const errorDetail = signUpResult.error?.data?.detail
      const errorMessage: string = Array.isArray(errorDetail)
        ? errorDetail[0]
        : errorDetail

      setSeverity('error')
      setUserMessage(`Something went wrong: ${errorMessage}`)
    }

    if (signUpResult.isLoading) {
      setUserMessage('')
    }
  }, [signUpResult, userMessage])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const roleId = 2
    const addressId = 1

    if (!isSignUpFormValid(username, password, email)) {
      setUserMessage('Fill properly form')
      return
    }

    signUp({
      body: {
        username,
        email,
        password,
        role_id: roleId,
        address_id: addressId,
      },
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
                  label="Name"
                  autoFocus
                  color="secondary"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}
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
                  color="secondary"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  error={!isEmailValid(email)}
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
                  color="secondary"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                />
                <PasswordStrengthBar password={password} />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="secondary" />
                  }
                  label="I agree to terms and conditions*"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                background: '#FCA311',
                color: '#FFF',
                borderRadius: '10px',
                boxSizing: 'border-box',
                textTransform: 'none',
                '&:hover': {
                  background: '#121D35',
                },
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2" color="secondary">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <ConfirmationMessageSnackbar
          message={userMessage}
          severity={severity}
        />
      </Container>
    </ThemeProvider>
  )
}

export default SignUp

export { isEmailValid }

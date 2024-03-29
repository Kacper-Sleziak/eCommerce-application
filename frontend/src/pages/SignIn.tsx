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
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { isEmailValid } from './SignUp'
import ConfirmationMessageSnackbar from '../components/sharedComponents/ConfirmationMessageSnackbar'
import { useSignInMutation } from '../store/services/UserDataApi'
import { updateUserAuth } from '../store/slices/UserDataSlice'

const isSignInDataValid = (email: string, password: string) => {
  if (email !== '' && password !== '' && isEmailValid(email)) {
    return true
  }
  return false
}

interface AlertProps {
  severity: 'error' | 'info' | 'warning' | 'success'
}

const SignIn = () => {
  const [signInText] = useState<string>('Sign in')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [userMessage, setUserMessage] = useState<string>('')
  const [severity, setSeverity] = useState<AlertProps['severity']>('info')

  const [signIn, signInResult] = useSignInMutation()

  const dispatch = useDispatch()

  useEffect(() => {
    if (signInResult.isSuccess) {
      setSeverity('success')
      dispatch(
        updateUserAuth({ accessToken: signInResult.data['access_token'] }),
      )
    } else {
      setSeverity('error')
    }
  }, [signInResult])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isSignInDataValid(email, password)) {
      setUserMessage('Wrong email or password!')
      return
    }
    signIn({
      body: {
        email,
        password,
      },
    })
  }

  return (
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
          {signInText}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            color="secondary"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            color="secondary"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="secondary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: '3',
              mb: '2',
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
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2" color="secondary">
                Do not have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <ConfirmationMessageSnackbar message={userMessage} severity={severity} />
    </Container>
  )
}

export default SignIn

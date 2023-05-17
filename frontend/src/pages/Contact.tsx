import React from 'react'
import {
  Button,
  Card,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Typography,
} from '@mui/material'

const Contact = () => {
  return (
    <Card>
      <Typography variant="h4">
        If you have any questions, feel free to contact us!{' '}
      </Typography>
      <FormControl>
        <InputLabel>Message</InputLabel>
        <Input />
        <FormHelperText>Enter the message</FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel>Your email</InputLabel>
        <Input />
        <FormHelperText>Enter your email</FormHelperText>
      </FormControl>
      <Button
        variant="outlined"
        sx={{
          color: '#000',
          background: '#fff',
          border: '2px solid #000 !important',
          fontWeight: '500',
          fontStyle: 'normal',
          fontSize: '20px',
          lineHeight: '23px',
          textTransform: 'none',
          padding: '0.5rem 1rem',
        }}
      >
        Send
      </Button>
    </Card>
  )
}

export default Contact

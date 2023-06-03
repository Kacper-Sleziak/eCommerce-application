/* eslint-disable react/no-unescaped-entities */

import React from 'react'
import { Container, Typography } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'

const NotFoundPage = () => {
  return (
    <Container maxWidth="sm">
      <Typography
        variant="h3"
        align="center"
        style={{ color: 'black', marginBottom: '50px' }}
      >
        We are sorry, but we don't have the page that you are looking for :C
      </Typography>
      <LockIcon
        style={{
          fontSize: '10rem',
          verticalAlign: 'middle',
          marginRight: '0.5rem',
          marginLeft: '34%',
        }}
      />
    </Container>
  )
}

export default NotFoundPage

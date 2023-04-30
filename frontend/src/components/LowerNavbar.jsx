// import { useState } from 'react'
import Button from '@mui/material/Button'
import '../styles/navbar.css'

const LowerNavbar = () => {
  return (
    <div className="lowerNavbar">
      <Button
        color="primary"
        borderColor="primary"
        sx={{
          color: '#000',
          background: '#fff',
          border: '#000 !important',
          fontSize: '18px',
          fontWeight: '550',
          fontStyle: 'normal',
          textTransform: 'none',
          '&:hover': {
            background: '#fca311',
          },
        }}
      >
        Automotive
      </Button>
      <Button
        variant="outlined"
        color="primary"
        borderColor="primary"
        sx={{
          color: '#000',
          background: '#fff',
          border: '#000 !important',
          fontSize: '18px',
          fontWeight: '550',
          fontStyle: 'normal',
          textTransform: 'none',
          '&:hover': {
            background: '#fca311',
          },
        }}
      >
        Electronics
      </Button>
      <Button
        variant="outlined"
        color="primary"
        borderColor="primary"
        sx={{
          color: '#000',
          background: '#fff',
          border: '#000 !important',
          fontSize: '18px',
          fontWeight: '550',
          fontStyle: 'normal',
          textTransform: 'none',
          '&:hover': {
            background: '#fca311',
          },
        }}
      >
        Office furniture
      </Button>
      <Button
        variant="outlined"
        color="primary"
        borderColor="primary"
        sx={{
          color: '#000',
          background: '#fff',
          border: '#000 !important',
          fontSize: '18px',
          fontWeight: '550',
          fontStyle: 'normal',
          textTransform: 'none',
          '&:hover': {
            background: '#fca311',
          },
        }}
      >
        White goods
      </Button>
      <Button
        variant="outlined"
        color="primary"
        borderColor="primary"
        sx={{
          color: '#000',
          background: '#fff',
          border: '#000 !important',
          fontSize: '18px',
          fontWeight: '550',
          fontStyle: 'normal',
          textTransform: 'none',
          '&:hover': {
            background: '#fca311',
          },
        }}
      >
        Contact
      </Button>
    </div>
  )
}

export default LowerNavbar

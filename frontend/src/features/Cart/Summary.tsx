import React from 'react'
import { Card, Typography } from '@mui/material'

const Summary: React.FC = () => {
  return (
    <Card
      sx={{
        width: '270px',
        display: 'flex',
        flexDirection: 'row',
        padding: '1rem',
        borderRadius: '30px',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginTop: '0.5rem',
          marginLeft: '0.5rem',
          marginBottom: '0.5rem',
          fontWeight: '600',
        }}
      >
        Total cost: 30zł
      </Typography>
    </Card>
  )
}

export default Summary

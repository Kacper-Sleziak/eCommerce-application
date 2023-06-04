import React from 'react'
import { useSelector } from 'react-redux'
import { Card, Typography } from '@mui/material'
import { selectCartTotalPrice } from '../../store/slices/CartSlice'

const Summary: React.FC = () => {
  const totalCost = useSelector(selectCartTotalPrice)

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
        Total cost: {totalCost.toLocaleString(undefined, { useGrouping: true })}
        zł
      </Typography>
    </Card>
  )
}

export default Summary

import React, { useState } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

const QuantityControl = () => {
  const [quantity, setQuantity] = useState(1)

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1)
  }

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1))
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton onClick={handleDecrement}>
        <RemoveIcon
          sx={{
            backgroundColor: '#14213D',
            color: '#FFF',
            borderRadius: '5px',
          }}
        />
      </IconButton>
      <Typography variant="body1" sx={{ mx: 1 }}>
        {quantity}
      </Typography>
      <IconButton onClick={handleIncrement}>
        <AddIcon
          sx={{
            backgroundColor: '#14213D',
            color: '#FFF',
            borderRadius: '5px',
          }}
        />
      </IconButton>
    </Box>
  )
}

export default QuantityControl

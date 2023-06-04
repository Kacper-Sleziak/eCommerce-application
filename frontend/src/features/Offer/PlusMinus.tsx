import { useState, useEffect } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

interface QuantityControlProps {
  initialQuantity: number
  maxQuantity: number
  returnQuantity: (quantity: number) => void
}

const QuantityControl = ({
  initialQuantity = 1,
  maxQuantity,
  returnQuantity,
}: QuantityControlProps) => {
  const [quantity, setQuantity] = useState(initialQuantity)

  const handleIncrement = () => {
    quantity !== maxQuantity ? setQuantity(quantity + 1) : setQuantity(quantity)
  }

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1))
  }

  useEffect(() => {
    returnQuantity(quantity)
  }, [quantity])

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

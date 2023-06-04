import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import type { IItem } from '../../store/slices/CartSlice'
import { addItemToCart } from '../../store/slices/CartSlice'

interface CartQuantityControlProps {
  item: IItem
}

const CartQuantityControl: React.FC<CartQuantityControlProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()

  useEffect(() => {
    setQuantity(item.amount)
  }, [])

  const handleIncrement = () => {
    if (quantity < item.quantity) {
      setQuantity(quantity + 1)
      dispatch(addItemToCart(item))
    } else {
      setQuantity(quantity)
    }
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

export default CartQuantityControl

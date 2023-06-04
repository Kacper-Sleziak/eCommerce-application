import React from 'react'
import { useSelector } from 'react-redux'
import { Button, Card, CardMedia, Typography } from '@mui/material'
import { selectCart } from '../../store/slices/CartSlice'
import '../../styles/pages/cart.css'

const ItemsToBuy: React.FC = () => {
  const cartItems = useSelector(selectCart)

  const renderItems = () => {
    if (cartItems !== undefined) {
      return (
        <>
          {Object.values(cartItems).map((item: any) => (
            <Card
              key={item.id}
              sx={{
                width: '750px',
                display: 'flex',
                flexDirection: 'row',
                padding: '1rem',
                borderRadius: '30px',
                marginBottom: '15px',
              }}
            >
              <div>
                <CardMedia
                  component="img"
                  image={item.photo}
                  alt="Image"
                  sx={{
                    borderRadius: '20px',
                    height: '160px',
                    width: '210px',
                    flex: 1,
                  }}
                />
              </div>
              <div className="offerDetails">
                <div className="cartItems">
                  <Typography
                    variant="h5"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      fontStyle: 'normal',
                      textAlign: 'center',
                      color: '#000000',
                      fontWeight: '600',
                    }}
                  >
                    Quantity:{' '}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    {'  '}
                    {item.amount}
                    {'  '}
                  </Typography>
                </div>
                <Typography variant="h6" sx={{ fontWeight: '600' }}>
                  Item price: {item.total_price} zł
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: '600' }}>
                  Summary: {item.amount * item.total_price} zł
                </Typography>
              </div>
              <div className="deleteItemsButton">
                <Button
                  sx={{
                    mt: 3,
                    mb: 2,
                    width: '80%',
                    height: '30%',
                    background: '#FCA311',
                    color: '#FFF',
                    borderRadius: '10px',
                    boxSizing: 'border-box',
                    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
                    fontSize: '18px',
                    textTransform: 'none',
                    '&:hover': {
                      background: '#121D35',
                    },
                  }}
                >
                  Delete item(s)
                </Button>
              </div>
            </Card>
          ))}
        </>
      )
    }
    return <h3>You cart is empty!</h3>
  }

  return <>{renderItems()}</>
}

export default ItemsToBuy

import React from 'react'
import { useSelector } from 'react-redux'
import { Button, Card, CardMedia, Divider, Typography } from '@mui/material'
import { selectCart } from '../../store/slices/CartSlice'
import CartQuantityControl from './MinusPlus'
import '../../styles/pages/cart.css'

const ItemsToBuy: React.FC = () => {
  const cartItems = useSelector(selectCart)
  const options = { useGrouping: true }

  const renderItems = () => {
    if (cartItems !== undefined) {
      console.log(cartItems)
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
                  image={item.photos?.content}
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
                <Typography variant="h5" sx={{ fontWeight: '600' }}>
                  {item.name}
                </Typography>
                <div className="cartItems">
                  <Typography
                    variant="h6"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      fontStyle: 'normal',
                      textAlign: 'center',
                      color: '#000000',
                      fontWeight: '500',
                      marginRight: '7px',
                    }}
                  >
                    Quantity:
                  </Typography>
                  <CartQuantityControl item={item} />
                  <Typography variant="h6" sx={{ display: 'flex' }}>
                    {' '}
                    / {item.quantity}{' '}
                  </Typography>
                </div>
                <Typography variant="h6" sx={{ fontWeight: '500' }}>
                  Item price:{' '}
                  {item.total_price.toLocaleString(undefined, options)} zł
                </Typography>
                <Divider color="#C0C0C0" />
                <Typography variant="h6" sx={{ fontWeight: '600' }}>
                  Summary:{' '}
                  {(item.amount * item.total_price).toLocaleString(
                    undefined,
                    options,
                  )}{' '}
                  zł
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

import React from 'react'
import { Button, Card, CardMedia, Typography } from '@mui/material'
import QuantityControl from '../Offer/PlusMinus'
import '../../styles/pages/cart.css'

const ItemsToBuy: React.FC = () => {
  return (
    <Card
      sx={{
        width: '750px',
        display: 'flex',
        flexDirection: 'row',
        padding: '1rem',
        borderRadius: '30px',
      }}
    >
      <div>
        <CardMedia
          component="img"
          image="https://bi.im-g.pl/im/c9/14/1c/z29442249GMD,Kot-domowy-.jpg"
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
          <QuantityControl initialQuantity={1} maxQuantity={2} />
          <Typography
            variant="h6"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            {' '}
            / {2}{' '}
          </Typography>
        </div>
        <Typography variant="h5" sx={{ fontWeight: '600' }}>
          Price: 20 zł
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
  )
}

export default ItemsToBuy

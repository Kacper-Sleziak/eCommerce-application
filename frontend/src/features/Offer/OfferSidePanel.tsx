import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Button, Card, Typography } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import PlaceIcon from '@mui/icons-material/Place'
import QuantityControl from './PlusMinus'
import { addItemToCart } from '../../store/slices/CartSlice'

const OfferSidePanel = ({ data }: any) => {
  const [chooseQuantity, setChoosenQuantity] = useState(1)
  const getChoosenQuantityFromChild = (quantity: number) => {
    setChoosenQuantity(quantity)
  }

  const dispatch = useDispatch()

  const handleAddToCart = () => {
    const item = {
      id: data.id,
      name: data.name,
      brand: data.brand,
      product_description: data.product_description,
      amount: chooseQuantity,
      total_price: data.total_price,
      sale_type: data.sale_type,
      photos: data.photos[0],
    }

    dispatch(addItemToCart(item))
  }

  return (
    <Card
      sx={{
        padding: 2,
        width: '450px',
        boxShadow: 'none !important',
        marginLeft: '1rem',
      }}
    >
      <Typography variant="h4" fontWeight={600}>
        Price: {data.total_price} zł
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', margin: '0.5rem 0' }}>
        {/* <Typography variant="h5" fontWeight={500}> */}
        {/*   2006 */}
        {/* </Typography> */}
        <Box
          component={CircleIcon}
          sx={{ color: '#000', ml: 1, mr: 1, fontSize: 10 }}
        />
        <Typography variant="h5" fontWeight={500}>
          {data.brand}
        </Typography>
      </Box>
      <Card
        sx={{
          padding: 2,
          border: '3px solid #FCA311',
          borderRadius: '30px',
          width: '410px',
          height: '256px',
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Seller: {data.sellerId}
        </Typography>
        <div
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Button
            sx={{
              backgroundColor: '#14213d',
              borderRadius: '30px',
              width: '159px',
              height: '96px',
              '&:hover': {
                background: '#121D35',
              },
            }}
          >
            <Typography
              sx={{
                position: 'absolute',
                width: '141px',
                height: '59px',
                textTransform: 'none',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '24px;',
                lineHeight: '28px',
                textAlign: 'center',
                color: '#FFFFFF',
              }}
            >
              Write a message
            </Typography>
          </Button>
          <Button
            sx={{
              backgroundColor: '#14213d',
              borderRadius: '30px',
              width: '159px',
              height: '96px',
              '&:hover': {
                background: '#121D35',
              },
            }}
          >
            <Typography
              sx={{
                position: 'absolute',
                width: '141px',
                height: '59px',
                textTransform: 'none',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '24px;',
                lineHeight: '28px',
                textAlign: 'center',
                color: '#FFFFFF',
              }}
            >
              See phone number
            </Typography>
          </Button>
        </div>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PlaceIcon />
          <Typography variant="h6" fontWeight={600}>
            Wrocław, Lower Silesia
          </Typography>
        </Box>
      </Card>
      <Card
        sx={{
          padding: 2,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '410px',
          height: '50px',
          boxShadow: 'none',
        }}
      >
        <Typography
          sx={{
            width: '90px',
            height: '32px',
            left: '972px',
            top: '710px',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '20px',
            lineHeight: '23px',
            textAlign: 'center',
            color: '#000000',
          }}
        >
          quantity:{' '}
        </Typography>
        <QuantityControl
          initialQuantity={1}
          maxQuantity={data.quantity}
          returnQuantity={getChoosenQuantityFromChild}
        />
        <Typography sx={{ display: 'flex' }}> / {data.quantity} </Typography>
        <Button
          sx={{
            width: '173px',
            height: '54px',
            background: '#FCA311',
            borderRadius: '10px',
            marginLeft: '1rem',
            '&:hover': {
              background: '#FCA311',
            },
          }}
          onClick={handleAddToCart}
        >
          <Typography
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '183px',
              height: '42px',
              textTransform: 'none',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '24px;',
              lineHeight: '28px',
              textAlign: 'center',
              color: '#FFFFFF',
            }}
          >
            Add to cart
          </Typography>
        </Button>
      </Card>
    </Card>
  )
}

export default OfferSidePanel

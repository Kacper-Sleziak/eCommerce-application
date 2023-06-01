import { Box, Button, Card, Typography } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'
import PlaceIcon from '@mui/icons-material/Place'
import QuantityControl from './PlusMinus'

interface OfferSidePanelProps {
  quantity: number
  price: number
  brand: string
  sellerId: number // xddddd
}

const OfferSidePanel = ({
  quantity,
  price,
  brand,
  sellerId,
}: OfferSidePanelProps) => {
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
        Price: {price} zł
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
          {brand}
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
          Seller: {sellerId}
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
        <QuantityControl initialQuantity={1} maxQuantity={quantity} />
        <Typography sx={{ display: 'flex' }}> / {quantity} </Typography>
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

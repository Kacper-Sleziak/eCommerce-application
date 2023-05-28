import { Box, Card, CardMedia, Rating, Typography } from '@mui/material'
import PlaceIcon from '@mui/icons-material/Place'
import { Link } from 'react-router-dom'

interface OfferProps {
  id: number
  image: string
  title: string
  localization: string
  parameters: string
  price: string
  rating: number
}

const Offer = ({
  id,
  image,
  title,
  localization,
  parameters,
  price,
  rating,
}: OfferProps) => {
  const handleClick = () => {
    console.log(`Clicked ${id}`)
  }

  return (
    <Link to={`/offerdetails/?product_id=${id}`}>
      <Card
        onClick={handleClick}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          maxWidth: '778px',
          maxHeight: '200px',
          padding: 2,
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '30px',
          backgroundColor: '#E6E6E6',
          '&:hover': {
            background: '#a9a9a9',
          },
        }}
      >
        <div>
          <CardMedia
            component="img"
            image={image}
            alt="Image"
            sx={{
              borderRadius: '30px',
              height: '200px',
              width: '250px',
              flex: 1,
            }}
          />
        </div>
        <div>
          <Box sx={{ flex: 1, marginLeft: 2 }}>
            <Typography variant="h5" fontWeight="600">
              {title}
            </Typography>
            <Typography variant="body1">{parameters}</Typography>
            <Typography variant="h6" fontWeight="600">
              {price}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PlaceIcon />
              <Typography variant="subtitle1">{localization}</Typography>
            </Box>

            <Box
              sx={{
                '& > legend': { mt: 2 },
              }}
            >
              <Typography component="legend" fontWeight="500">
                Seller review
              </Typography>
              <Rating name="read-only" value={rating} readOnly />
            </Box>
          </Box>
        </div>
      </Card>
    </Link>
  )
}

export default Offer

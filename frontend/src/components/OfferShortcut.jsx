import PropTypes from 'prop-types'
import { Card, CardMedia, CardContent, Typography } from '@mui/material'
import '../styles/home.css'

const OfferShortcut = ({ imageUrl, title, price }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        padding: 2,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        borderRadius: '30px',
        backgroundColor: '#E6E6E6',
        '&:hover': {
          background: '#a9a9a9',
        },
      }}
    >
      <CardMedia
        component="img"
        height="300px"
        width="250px"
        image={imageUrl}
        alt="Image"
        sx={{ borderRadius: '30px' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {title}
        </Typography>
        <Typography variant="h6">{price}</Typography>
      </CardContent>
    </Card>
  )
}

OfferShortcut.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
}

export default OfferShortcut

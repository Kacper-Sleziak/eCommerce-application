import { Card, CardMedia, CardContent, Typography } from '@mui/material'
import '../../styles/pages/home.css'

interface OfferShortcutProps {
  imageUrl: string
  title: string
  price: string
}

const OfferShortcut = ({ imageUrl, title, price }: OfferShortcutProps) => {
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
      <CardContent sx={{ width: '85% !important', margin: 'none' }}>
        <Typography gutterBottom variant="h5" sx={{ fontSize: '1.3rem' }}>
          {title}
        </Typography>
        <Typography variant="h6">{price}</Typography>
      </CardContent>
    </Card>
  )
}

export default OfferShortcut

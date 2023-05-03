import { Card, CardMedia, Typography } from '@mui/material'
import Breadcrumb from '../components/Breadcrumbs'
import OfferSidePanel from '../components/OfferSidePanel'
import SimpleAccordion from '../components/ExpandedTab'
import '../styles/offer.css'

const Offer = () => {
  return (
    <div>
      <Breadcrumb />
      <Typography variant="h4" fontWeight="600">
        Samochód maluch
      </Typography>
      <div className="offerContainer">
        {/* tutaj ten panel boczny */}
        <Card
          style={{
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            maxWidth: '750px',
            height: '470px',
            borderRadius: '30px',
          }}
        >
          <CardMedia
            image="https://i.wpimg.pl/1280x/m.autokult.pl/fiat-126-maluch-1-9e6b06ce6f28d6.jpg"
            component="img"
            alt="Image"
            sx={{
              borderRadius: '30px',
              height: '446px',
              width: '720px',
            }}
          />
        </Card>
        <OfferSidePanel />
      </div>
      <SimpleAccordion />
    </div>
  )
}

export default Offer

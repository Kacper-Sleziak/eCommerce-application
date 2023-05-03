import { Card, Divider, Typography, Slider } from '@mui/material'
import Offer from '../components/Offer'
import UsedFilter from '../components/UsedFilter'
import '../styles/offerlistpage.css'

const OfferList = () => {
  return (
    <div className="offerListClass">
      <div>
        <Card
          sx={{
            padding: 2,
            position: 'absolute',
            width: '398px',
            height: '806px',
            background: '#E6E6E6',
            borderRadius: '30px',
          }}
        >
          <Typography
            sx={{
              paddingBottom: 2,
              width: '222px',
              height: '30px',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '32px',
              lineHeight: '37px',
              color: '#000000',
            }}
          >
            Used filters
          </Typography>
          <Divider sx={{ border: '2px solid #A09D9D' }} />
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <UsedFilter filtername="Price" filterdetail="from lowest" />
            <UsedFilter filtername="Brand" filterdetail="BMW" />
            <UsedFilter filtername="Localization" filterdetail="Wrocław" />
          </div>
          <Typography
            sx={{
              paddingTop: 2,
              width: '222px',
              height: '30px',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '32px',
              lineHeight: '37px',
              color: '#000000',
            }}
          >
            Filters
          </Typography>
          <Slider
            defaultValue={50}
            aria-label="Default"
            valueLabelDisplay="auto"
            color="primary"
          />
          <Divider sx={{ border: '2px solid #A09D9D' }} />
        </Card>
      </div>
      <div className="offers">
        <Typography variant="h3">Offers</Typography>
        <Offer
          image="https://i.wpimg.pl/1280x/m.autokult.pl/fiat-126-maluch-1-9e6b06ce6f28d6.jpg"
          title="Samochód Maluch"
          localization="Wrocław"
          parameters="color: red, year: 1990, status: super cool"
          price="6200 zł"
          rating="4"
        />
        <Offer
          image="https://i.wpimg.pl/1280x/m.autokult.pl/fiat-126-maluch-1-9e6b06ce6f28d6.jpg"
          title="Samochód Maluch"
          localization="Wrocław"
          parameters="color: red, year: 1990, status: super cool"
          price="6200 zł"
          rating="4"
        />
        <Offer
          image="https://i.wpimg.pl/1280x/m.autokult.pl/fiat-126-maluch-1-9e6b06ce6f28d6.jpg"
          title="Samochód Maluch"
          localization="Wrocław"
          parameters="color: red, year: 1990, status: super cool"
          price="6200 zł"
          rating="4"
        />
        <Offer
          image="https://i.wpimg.pl/1280x/m.autokult.pl/fiat-126-maluch-1-9e6b06ce6f28d6.jpg"
          title="Samochód Maluch"
          localization="Wrocław"
          parameters="color: red, year: 1990, status: super cool"
          price="6200 zł"
          rating="4"
        />
      </div>
    </div>
  )
}

export default OfferList

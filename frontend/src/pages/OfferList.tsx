import { Card, Divider, Typography } from '@mui/material'
import CheckboxCategories from '../features/OfferList/Checkbox'
import Offer from '../features/OfferList/Offer'
import UsedFilter from '../features/OfferList/UsedFilter'
import '../styles/pages/offerlistpage.css'

const brandList = [{ title: 'BMW' }, { title: 'Audi' }, { title: 'Fiat' }]
const localisationList = [
  { title: 'Wrocław' },
  { title: 'Warsaw' },
  { title: 'Cracow' },
]
const colorList = [{ title: 'black' }, { title: 'red' }, { title: 'blue' }]
const yearList = [{ title: '2000' }, { title: '2006' }, { title: '2020' }]
const categoryList = [{ title: 'sports car' }, { title: 'jeep' }]

const OfferList: React.FC = () => {
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
            Filters
          </Typography>
          <Divider sx={{ border: '2px solid #A09D9D' }} />
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 20,
              height: '450px',
              width: '300px',
            }}
          >
            <CheckboxCategories categories={brandList} filterlabel="Brand" />
            <CheckboxCategories categories={yearList} filterlabel="Year" />
            <CheckboxCategories categories={colorList} filterlabel="Color" />
            <CheckboxCategories
              categories={categoryList}
              filterlabel="Category"
            />
            <CheckboxCategories
              categories={localisationList}
              filterlabel="Localisation"
            />
          </div>
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
          rating={4}
        />
        <Offer
          image="https://i.wpimg.pl/1280x/m.autokult.pl/fiat-126-maluch-1-9e6b06ce6f28d6.jpg"
          title="Samochód Maluch"
          localization="Wrocław"
          parameters="color: red, year: 1990, status: super cool"
          price="6200 zł"
          rating={4}
        />
        <Offer
          image="https://i.wpimg.pl/1280x/m.autokult.pl/fiat-126-maluch-1-9e6b06ce6f28d6.jpg"
          title="Samochód Maluch"
          localization="Wrocław"
          parameters="color: red, year: 1990, status: super cool"
          price="6200 zł"
          rating={4}
        />
        <Offer
          image="https://i.wpimg.pl/1280x/m.autokult.pl/fiat-126-maluch-1-9e6b06ce6f28d6.jpg"
          title="Samochód Maluch"
          localization="Wrocław"
          parameters="color: red, year: 1990, status: super cool"
          price="6200 zł"
          rating={4}
        />
      </div>
    </div>
  )
}

export default OfferList

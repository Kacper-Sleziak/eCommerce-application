/* eslint-disable */

import { Card, Divider, Typography } from '@mui/material'
import CheckboxCategories from '../features/OfferList/Checkbox'
import { useDispatch, useSelector } from 'react-redux'
import UsedFilter from '../features/OfferList/UsedFilter'
import '../styles/pages/offerlistpage.css'
import MappedOffers from '../features/OfferList/MappedOffers'
import { useRef } from 'react'
import { FilterRefInterface } from '../features/OfferList/utils/filterCallInterface'
import { MappedOffersCallInterface } from '../features/OfferList/utils/mappedOffersCallInterface'
import { selectOfferFilters } from '../store/slices/OfferFiltersSlice'
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
  const brandFilterRef = useRef<FilterRefInterface>(null)
  const colorFilterRef = useRef<FilterRefInterface>(null)
  const yearFilterRef = useRef<FilterRefInterface>(null)
  const categoryFilterRef = useRef<FilterRefInterface>(null)

  const refArray = [
    brandFilterRef,
    colorFilterRef,
    yearFilterRef,
    categoryFilterRef,
  ]

  const mappedOffersRef = useRef<MappedOffersCallInterface>(null)

  const filterOnClick = () => {
    refArray.map((ref) => {
      if (ref.current !== null) {
        ref.current.pushFiltersToStore()
      }
    })
    
    if (mappedOffersRef.current){
      mappedOffersRef.current.updateUrlParams()
    }
  }

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
            <CheckboxCategories
              categories={brandList}
              filterlabel="brand"
              ref={brandFilterRef}
            />
            <CheckboxCategories
              categories={yearList}
              filterlabel="year"
              ref={yearFilterRef}
            />
            <CheckboxCategories
              categories={colorList}
              filterlabel="color"
              ref={colorFilterRef}
            />
            <CheckboxCategories
              categories={categoryList}
              filterlabel="category"
              ref={categoryFilterRef}
            />

            <button type="button" onClick={filterOnClick}>
              Filter
            </button>
          </div>
        </Card>
      </div>
      <div className="offers">
        <Typography variant="h3">Offers</Typography>
        <MappedOffers ref={mappedOffersRef} />
      </div>
    </div>
  )
}

export default OfferList

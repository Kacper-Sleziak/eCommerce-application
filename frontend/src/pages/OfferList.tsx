import React, { useRef } from 'react'
import { Card, Divider, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import CheckboxCategories from '../features/OfferList/Checkbox'
import UsedFilter from '../features/OfferList/UsedFilter'
import '../styles/pages/offerlistpage.css'
import MappedOffers from '../features/OfferList/MappedOffers'
import OrderedBy from '../features/OfferList/OrderedBy'
import PaginationBar from '../features/OfferList/PaginationBar'
import YearRangeSlider from '../features/OfferList/YearRangeSlider'
import type { FilterRefInterface } from '../features/OfferList/utils/filterCallInterface'
import Grid from '@mui/material/Grid'

const brandList = [
  { title: 'Basic' },
  { title: 'Bentley' },
  { title: 'Tesla' },
  { title: 'Volvo' },
]
const colorList = [
  { title: 'Black' },
  { title: 'Red' },
  { title: 'Blue' },
  { title: 'Yellow' },
  { title: 'White' },
  { title: 'Green' },
]
const categoryList = [{ title: 'Chair' }, { title: 'Desk' }, { title: 'Car' }]

const OfferList: React.FC = () => {
  const brandFilterRef = useRef<FilterRefInterface | null>(null)
  const colorFilterRef = useRef<FilterRefInterface | null>(null)
  const yearFilterRef = useRef<FilterRefInterface | null>(null)
  const categoryFilterRef = useRef<FilterRefInterface | null>(null)

  const refArray = [
    brandFilterRef,
    colorFilterRef,
    yearFilterRef,
    categoryFilterRef,
  ]

  const filterOnClick = () => {
    refArray.forEach((ref) => {
      if (ref.current !== null) {
        ref.current.pushFiltersToStore()
      }
    })
  }

  return (
    <Grid container alignItems="center" spacing={10}>
      <Grid item xs={6}>
        <Pagination count={10} shape="rounded" />
      </Grid>

      <Grid item xs={3}>
        <PaginationBar />
      </Grid>

      <Grid item xs={3}>
        <OrderedBy />
      </Grid>
      <Grid item xs={5}>
        <Card
          sx={{
            padding: 2,
            // position: 'absolute',
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
          <UsedFilter filtername="Price" filterdetail="from lowest" />
          <UsedFilter filtername="Brand" filterdetail="BMW" />
          <UsedFilter filtername="Localization" filterdetail="Wrocław" />
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
          <CheckboxCategories
            categories={brandList}
            filterlabel="brand"
            ref={brandFilterRef}
          />
          <YearRangeSlider />
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

          <Button variant="contained" onClick={filterOnClick}>
            Filter
          </Button>
        </Card>
        </Grid>
      <Grid item xs={7}>
        <MappedOffers />
      </Grid>
    </Grid >

  )
}

export default OfferList

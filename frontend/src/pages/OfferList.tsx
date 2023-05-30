import React, { useRef } from 'react'
import { Card, Divider, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Pagination from '@mui/material/Pagination'
import Grid from '@mui/material/Grid'
import { useDispatch, useSelector } from 'react-redux'
import CheckboxCategories from '../features/OfferList/Checkbox'
import '../styles/pages/offerlistpage.css'
import MappedOffers from '../features/OfferList/MappedOffers'
import OrderedBy from '../features/OfferList/OrderedBy'
import PaginationBar from '../features/OfferList/PaginationBar'
import {
  selectPagination,
  updatePage,
  clearFilters,
} from '../store/slices/OfferFiltersSlice'
import type { FilterRefInterface } from '../features/OfferList/interface/filterCallInterface'
import { useGetOffersCountQuery } from '../store/services/OfferListDataApi'

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
  const categoryFilterRef = useRef<FilterRefInterface | null>(null)

  const refArray = [brandFilterRef, colorFilterRef, categoryFilterRef]

  const { data, isLoading } = useGetOffersCountQuery({})

  const pagination = useSelector(selectPagination)
  const { page, limit } = pagination

  const dispatch = useDispatch()

  const filterOnClick = () => {
    refArray.forEach((ref) => {
      if (ref.current !== null) {
        ref.current.pushFiltersToStore()
      }
    })
  }

  const clearOnClick = () => {
    dispatch(clearFilters())

    refArray.forEach((ref) => {
      if (ref.current !== null) {
        ref.current.clearFilter()
      }
    })
  }

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    dispatch(updatePage(newPage))
  }

  const renderPagination = () => {
    if (isLoading) {
      return <h3>loading...</h3>
    }
    if (data !== undefined) {
      const dataCount = data.count
      const pagesCount = Math.ceil(dataCount / limit)
      return (
        <Pagination
          page={page}
          count={pagesCount}
          shape="rounded"
          onChange={handlePaginationChange}
        />
      )
    }
    return <h3>loading...</h3>
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={5} />

      <Grid container alignItems="center" item xs={2}>
        {renderPagination()}
      </Grid>

      <Grid item xs={2}>
        <PaginationBar />
      </Grid>

      <Grid item xs={3}>
        <OrderedBy />
      </Grid>

      <Grid item xs={4}>
        <Card
          sx={{
            padding: 2,
            width: '300px',
            background: '#E6E6E6',
            borderRadius: '30px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            sx={{
              paddingTop: 2,
              paddingBottom: 2,
              width: '180px',
              height: '30px',
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: '32px',
              lineHeight: '37px',
              color: '#000000',
            }}
          >
            Filters
          </Typography>
          <Divider sx={{ border: '1px solid #A09D9D' }} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              marginTop: '0.5rem',
            }}
          >
            <CheckboxCategories
              categories={brandList}
              filterlabel="brand"
              ref={brandFilterRef}
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
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: '2rem',
              justifyContent: 'space-around',
            }}
          >
            <Button
              variant="contained"
              onClick={filterOnClick}
              sx={{
                width: '100px',
                height: '40px',
                filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
                background: '#FCA311',
                color: '#FFF',
                borderRadius: '10px',
                boxSizing: 'border-box',
                textTransform: 'none',
                fontSize: '18px',
                '&:hover': {
                  background: '#121D35',
                },
              }}
            >
              Filter
            </Button>
            <Button
              variant="contained"
              onClick={clearOnClick}
              sx={{
                width: '100px',
                height: '40px',
                filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
                background: '#FCA311',
                color: '#FFF',
                borderRadius: '10px',
                boxSizing: 'border-box',
                textTransform: 'none',
                fontSize: '18px',
                '&:hover': {
                  background: '#121D35',
                },
              }}
            >
              Clear
            </Button>
          </div>
        </Card>
      </Grid>
      <Grid item xs={8}>
        <MappedOffers />
      </Grid>
    </Grid>
  )
}

export default OfferList

import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { Typography } from '@mui/material'
import { useGetOfferListQuery } from '../../store/services/OfferListDataApi'
import Offer from './Offer'
import { searchParamsToStringQuery } from '../../utils/urls'
import {
  selectOffersData,
  updatePage,
  updatePaginationLimit,
  updateOrdering,
  clearFilters,
  updateFilters,
} from '../../store/slices/OfferFiltersSlice'
import type { IUpdateOrderingLoad } from '../../store/slices/OfferFiltersSlice'

interface readParam {
  filterName: string
  data: string[]
}

const MappedOffers = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const paramsString = searchParamsToStringQuery(searchParams)

  const { data, error, isLoading } = useGetOfferListQuery(paramsString)
  const storeFilters = useSelector(selectOffersData)

  const dispatch = useDispatch()

  const readFiltersFromParamasAndPushToStore = () => {
    dispatch(clearFilters)
    const brand: readParam = {
      filterName: 'brand',
      data: [],
    }
    const color: readParam = {
      filterName: 'color',
      data: [],
    }
    const category: readParam = {
      filterName: 'category',
      data: [],
    }

    const ordering: IUpdateOrderingLoad = {
      orderBy: '',
      order: '',
    }

    for (const [key, value] of searchParams.entries()) {
      switch (key) {
        case 'page':
          dispatch(updatePage(parseInt(value)))
          break
        case 'limit':
          dispatch(updatePaginationLimit(parseInt(value)))
          break
        case 'order':
          ordering.order = value
          dispatch(updateOrdering(ordering))
          break
        case 'order_by':
          ordering.orderBy = value
          dispatch(updateOrdering(ordering))
          break
        case 'color':
          color.data = [...color.data, value]
          dispatch(updateFilters(color))
          break
        case 'category':
          category.data = [...category.data, value]
          dispatch(updateFilters(category))
          break
        case 'brand':
          brand.data = [...brand.data, value]
          dispatch(updateFilters(brand))
          break
        default:
      }
    }
  }

  // Read Filters from params and push to store
  useEffect(() => {
    readFiltersFromParamasAndPushToStore()
  }, [])

  useEffect(() => {
    const storeFiltersVar: any = storeFilters
    setSearchParams(storeFiltersVar)
  }, [storeFilters])

  const returnOffers: () => JSX.Element = () => {
    if (isLoading) {
      return (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      )
    }

    if (error !== undefined) {
      if ('status' in error) {
        const errMsg =
          'error' in error ? error.error : JSON.stringify(error.data)

        return (
          <div>
            <div>An error has occurred:</div>
            <div>{errMsg}</div>
          </div>
        )
      }
      return <div>{error.message}</div>
    }

    if (data !== undefined) {
      return (
        <Stack spacing={3} direction="column">
          <Typography
            sx={{
              paddingBottom: 2,
              width: '222px',
              height: '30px',
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: '32px',
              lineHeight: '37px',
              color: '#000000',
            }}
          >
            Offers
          </Typography>
          {Object.values(data).map((offer: any) => (
            <Offer
              key={`offer-${offer.id}`}
              id={offer.id}
              image={offer.photos[0]?.content}
              title={offer.name}
              localization="Wrocław"
              parameters={offer.description}
              price={offer.total_price}
              rating={4}
            />
          ))}
        </Stack>
      )
    }
    return <h1>No data to show</h1>
  }

  return <>{returnOffers()}</>
}

export default MappedOffers

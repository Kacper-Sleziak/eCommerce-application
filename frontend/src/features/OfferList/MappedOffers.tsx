/* eslint-disable */

import { useSearchParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { useGetOfferListQuery } from '../../store/services/OfferListDataApi'
import Offer from './Offer'
import { searchParamsToStringQuery } from '../../utils/urls'
import { getPhotoFromAPI } from '../../utils/getPhotoFromAPI'
import { OfferInterface } from '../../types/offer'
import { bool } from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { selectOfferFilters } from '../../store/slices/OfferFiltersSlice'
import { MappedOffersCallInterface } from './utils/mappedOffersCallInterface'
import React, { forwardRef, useImperativeHandle, useState } from 'react'

const MappedOffers = forwardRef<MappedOffersCallInterface>((props, ref) => {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [searchParams, setSearchParams] = useSearchParams()
  const paramsString = searchParamsToStringQuery(searchParams)

  const { data, error, isLoading } = useGetOfferListQuery({ paramsString })

  var storeFilters = useSelector(selectOfferFilters)

  useImperativeHandle(ref, () => ({
    updateUrlParams() {
      setSearchParams(storeFilters)
    },
  }))

  const returnOffers: () => JSX.Element = () => {
    if (isLoading) {
      return <CircularProgress />
    }
    if (error) {
      return (
        <>
          <h1>Eror 500</h1>
          <span>
            error on the server side, occurs, we are sorry for problems
          </span>
        </>
      )
    }

    if (data) {
      return (
        <>
          {Object.keys(data).map((key) => (
            <Offer
              key={key}
              image={getPhotoFromAPI(data[key].photos)}
              title={data[key].name}
              localization="Wrocław"
              parameters={data[key].description}
              price={data[key].total_price}
              rating={4}
            />
          ))}
        </>
      )
    }
    return <h1>No data to show</h1>
  }

  return <>{returnOffers()}</>
})

export default MappedOffers

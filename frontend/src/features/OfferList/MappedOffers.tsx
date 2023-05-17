import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress'
import { useGetOfferListQuery } from '../../store/services/OfferListDataApi'
import Offer from './Offer'
import { searchParamsToStringQuery } from '../../utils/urls'
import { getPhotoFromAPI } from '../../utils/getPhotoFromAPI'
import { selectOfferFilters } from '../../store/slices/OfferFiltersSlice'

const MappedOffers = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const paramsString = searchParamsToStringQuery(searchParams)

  const { data, error, isLoading } = useGetOfferListQuery(paramsString)
  const storeFilters = useSelector(selectOfferFilters)

  useEffect(() => {
    const storeFiltersVar: any = storeFilters
    setSearchParams(storeFiltersVar)
  }, [storeFilters])

  const returnOffers: () => JSX.Element = () => {
    if (isLoading) {
      return <CircularProgress />
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
}

export default MappedOffers

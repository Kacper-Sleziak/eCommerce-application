import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import { useGetOfferListQuery } from '../../store/services/OfferListDataApi'
import Offer from './Offer'
import { searchParamsToStringQuery } from '../../utils/urls'
import { selectOffersData } from '../../store/slices/OfferFiltersSlice'

const MappedOffers = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const paramsString = searchParamsToStringQuery(searchParams)

  const { data, error, isLoading } = useGetOfferListQuery(paramsString)
  const storeFilters = useSelector(selectOffersData)

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
        <Stack spacing={3} direction="column">
          {Object.values(data).map((offer: any) => (
            <Offer
              key={`offer-${offer.id}`}
              id={offer.id}
              image={offer.photos[0].content}
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

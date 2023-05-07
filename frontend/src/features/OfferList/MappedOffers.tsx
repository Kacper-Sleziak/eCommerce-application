import { useSearchParams } from 'react-router-dom'
import { useGetOfferListQuery } from '../../store/services/OfferListDataApi'
import Offer from './Offer'
import { searchParamsToStringQuery } from '../../utils/urls'
import { getPhotoFromAPI } from '../../utils/getPhotoFromAPI'

const MappedOffers: React.FC = () => {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [searchParams, setSearchParams] = useSearchParams()

  const paramsString = searchParamsToStringQuery(searchParams)
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { data, error, isLoading } = useGetOfferListQuery({ paramsString })

  const returnOffers: () => any = () => {
    const offers: JSX.Element[] = []
    if (!isLoading) {
      Object.keys(data).forEach((key) => {
        var offer = data[key]
        offers.push(
          <Offer
            key={key}
            image={getPhotoFromAPI(offer.photos)}
            title={offer.name}
            localization="Wrocław"
            parameters={offer.description}
            price={offer.total_price}
            rating={4}
          />,
        )
      })
      return offers
    }
    return <h1>There are no offers to show</h1>
  }

  return <div>{returnOffers()}</div>
}

export default MappedOffers

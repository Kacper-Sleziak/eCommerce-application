import { OfferInterface } from '../../types/offer'
import { useGetOfferListQuery } from '../../store/services/OfferListDataApi'
import Offer from './Offer'
import { useSearchParams } from 'react-router-dom'
import { searchParamsToStringQuery } from '../../utils/urls'

const MappedOffers: React.FC = () => {
  let [searchParams, setSearchParams] = useSearchParams()

  const paramsString = searchParamsToStringQuery(searchParams)
  const { data, error, isLoading } = useGetOfferListQuery({ paramsString })

  const returnOffers: () => any = () => {
    const offers: JSX.Element[] = []
    if (!isLoading) {
      Object.keys(data).forEach((key) => {
        var offer = data[key]

        offers.push(
          <Offer
            key={key}
            image="https://i.wpimg.pl/1280x/m.autokult.pl/fiat-126-maluch-1-9e6b06ce6f28d6.jpg"
            title={offer.name}
            localization="Wrocław"
            parameters={offer.description}
            price={`${offer.total_price}`}
            rating={4}
          />,
        )
      })
      return offers
    } else {
      return <h1>There are no offers to show</h1>
    }
  }

  return <div>{returnOffers()}</div>
}

export default MappedOffers

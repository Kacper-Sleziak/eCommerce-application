import { Card, CardMedia, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import OfferSidePanel from '../features/Offer/OfferSidePanel'
import SimpleAccordion from '../features/Offer/ExpandedTab'
import '../styles/pages/offer.css'
import { useGetProductByIdQuery } from '../store/services/OfferListDataApi'
import FAQPage from '../components/FAQPage'

// @ts-expect-error
const getListedValuesFromOvercomplicatedStructure = (items) => {
  // @ts-expect-error
  const itemsList = Object.values(items).map((value) => value.name)

  return itemsList
}

const Offer: React.FC = () => {
  const [queryParameters] = useSearchParams()

  const { data } = useGetProductByIdQuery(
    // @ts-expect-error
    parseInt(queryParameters.get('product_id'), 10),
  )

  const returnOffer = () => {
    if (data !== undefined) {
      return (
        <div>
          <Typography variant="h4" fontWeight="600">
            {data.name}
          </Typography>
          <div className="offerContainer">
            <Card
              style={{
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                maxWidth: '750px',
                height: '470px',
                borderRadius: '30px',
              }}
            >
              <CardMedia
                image={data.photos[0]?.content}
                component="img"
                alt="Image"
                sx={{
                  borderRadius: '30px',
                  height: '446px',
                  width: '720px',
                }}
              />
            </Card>
            <OfferSidePanel
              quantity={data.quantity}
              price={data.total_price}
              brand={data.brand}
              sellerId={data.seller_id}
            />
          </div>
          <SimpleAccordion
            description={data.product_description}
            colors={getListedValuesFromOvercomplicatedStructure(data.colors)}
            categories={getListedValuesFromOvercomplicatedStructure(
              data.categories,
            )}
          />
          <br />
          <br />
          <Typography>Q&A Section:</Typography>
          <FAQPage
            // @ts-expect-error
            productId={parseInt(queryParameters.get('product_id'), 10)}
          />
        </div>
      )
    }

    return <Typography>Ups, no data </Typography>
  }

  return <> {returnOffer()} </>
}

export default Offer

import { Card, CardMedia, Typography } from '@mui/material'
import OfferSidePanel from '../features/Offer/OfferSidePanel'
import SimpleAccordion from '../features/Offer/ExpandedTab'
import '../styles/pages/offer.css'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useGetProductByIdQuery } from '../store/services/OfferListDataApi'

const getListedValuesFromOvercomplicatedStructure = (items) => {
  const itemsList = Object.values(items).map(value => value.name);

  console.log(items);

  return itemsList

}

const Offer: React.FC = () => {
  const [queryParameters] = useSearchParams()

  const { data } = useGetProductByIdQuery(parseInt(queryParameters.get('product_id')));

  useEffect(() => {
    console.log({ queryParameters })
    console.log(queryParameters.get('product_id'))
    console.log({ data });

    if (data !== undefined) {
      console.log(Object.values(data.colors))
      const ex = {}
      const nameList = Object.values(ex).map(value => value.name);

      console.log(nameList);
    }
  })


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
                image={data.photos[0].content}
                component="img"
                alt="Image"
                sx={{
                  borderRadius: '30px',
                  height: '446px',
                  width: '720px',
                }}
              />
            </Card>
            <OfferSidePanel quantity={data.quantity} price={data.total_price} brand={data.brand} sellerId={data.seller_id} />
          </div>
          <SimpleAccordion
            description={data.product_description}
            colors={getListedValuesFromOvercomplicatedStructure(data.colors)}
            categories={getListedValuesFromOvercomplicatedStructure(data.categories)} />

        </div>
      )
    }

    return <></>
  }

  return (

    <> {returnOffer()} </>
  )
}

export default Offer

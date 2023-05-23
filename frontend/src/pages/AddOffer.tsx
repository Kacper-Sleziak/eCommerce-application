import '../styles/pages/addoffer.css'
import {
  Button,
  Card,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Typography,
} from '@mui/material'
import AddPhoto from '../features/AddOffer/AddPhoto'
import Categories from '../features/AddOffer/Categories'
import { useReducer } from 'react'

// interface FormData {
//   image: string
//   price: number
//   details: string
//   title: string
// }

// const initialFormData: FormData = {
//   image: '',
//   price: 0,
//   details: '',
//   title: '',
// }

// const categoryList = [
//   { title: 'car' },
//   { title: 'automotive' },
//   { title: 'sports' },
// ]

const categories = ['car', 'sports', 'automotive']

const AddOffer = () => {

  const handleSubmit = () => {
    console.log({ data })
  }

  const [data, updateData] = useReducer(
    (state, action) => {
      const updateData = { ...state }

      switch (action.type) {
        case 'name':
          updateData.name = action.payload
          break
        case 'description':
          updateData.description = action.payload
          break
        case 'quantity':
          updateData.quantity = parseInt(action.payload)
          break
        case 'totalPrice':
          updateData.totalPrice = parseFloat(action.payload)
          break
        case 'brand':
          updateData.brand = action.payload
          break
        // case 'sellerId':
        // break
        case 'categories':
          break
        default:
          return updateData
      }
      return updateData
    },

    {
      name: '',
      description: '',
      quantity: 0,
      totalPrice: 0,
      brand: 'xd',
      sellerId: 2, // hardcoded, dont touch!
      categories: [],
    }
  )



  return (
    <Card sx={{ maxWidth: '60%' }}>
      <div className="marginAddOfferTitle">
        <Typography variant="h3">Add offer</Typography>
      </div>
      <div className="formFlexAddOffer">
        <AddPhoto />
      </div>
      <div className="formFlexAddOfferInputs">
        <FormControl>
          <InputLabel>Name</InputLabel>
          <Input
            color="warning"
            value={data.name}
            onChange={(e) => { updateData({ type: 'name', payload: e.target.value }) }}
          />
          <FormHelperText>Enter the title of the product</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel>Description</InputLabel>
          <Input
            color="warning"
            multiline
            value={data.description}
            onChange={(e) => { updateData({ type: 'description', payload: e.target.value }) }}
          />
          <FormHelperText>Enter the description of the product</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel>Quantity</InputLabel>
          <Input
            color="warning"
            value={data.quantity}
            onChange={(e) => { updateData({ type: 'quantity', payload: e.target.value }) }}
          />
          <FormHelperText>Enter the quantity of the product</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel>Total price</InputLabel>
          <Input
            color="warning"
            value={data.totalPrice}
            onChange={(e) => { updateData({ type: 'totalPrice', payload: e.target.value }) }}
          />
          <FormHelperText>Enter the total price of the product</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel>Brand</InputLabel>
          <Input
            color="warning"
            value={data.brand}
            onChange={(e) => { updateData({ type: 'brand', payload: e.target.value }) }}
          />
          <FormHelperText>Enter the brand of the product</FormHelperText>
        </FormControl>
        {/* <FormControl> */}
        {/*   <InputLabel>Seller id</InputLabel> */}
        {/*   <Input color="warning" /> */}
        {/*   <FormHelperText>Enter the seller id of the product</FormHelperText> */}
        {/* </FormControl> */}
        <Categories categories={categories} />
      </div>
      <div className="addOfferButton">
        <Button
          onClick={handleSubmit}
          sx={{
            width: '141px',
            height: '53px',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            background: '#FCA311',
            borderRadius: '10px',
            boxSizing: 'border-box',
            textTransform: 'none',
            fontSize: '18px',
            '&:hover': {
              background: '#121D35',
            },
          }}
        >
          Add offer
        </Button>
      </div>
    </Card>
  )
}

export default AddOffer

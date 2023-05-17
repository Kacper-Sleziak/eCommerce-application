import {
  Button,
  Card,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Typography,
} from '@mui/material'
import CheckboxCategories from '../features/OfferList/Checkbox'

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

const categoryList = [
  { title: 'car' },
  { title: 'automotive' },
  { title: 'sports' },
]

const AddOffer = () => {
  return (
    <Card>
      <Typography variant="h3">Add offer</Typography>
      <Button
        variant="outlined"
        sx={{
          color: '#000',
          background: '#fff',
          border: '2px solid #000 !important',
          fontWeight: '500',
          fontStyle: 'normal',
          fontSize: '20px',
          lineHeight: '23px',
          textTransform: 'none',
          padding: '0.5rem 1rem',
        }}
      >
        + Add photo
      </Button>
      <FormControl>
        <InputLabel>Name</InputLabel>
        <Input />
        <FormHelperText>Enter the title of the product</FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel>Description</InputLabel>
        <Input />
        <FormHelperText>Enter the description of the product</FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel>Quantity</InputLabel>
        <Input />
        <FormHelperText>Enter the quantity of the product</FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel>Total price</InputLabel>
        <Input />
        <FormHelperText>Enter the total price of the product</FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel>Sale type</InputLabel>
        <Input />
        <FormHelperText>Enter the sale type of the product</FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel>Seller id</InputLabel>
        <Input />
        <FormHelperText>Enter the seller id of the product</FormHelperText>
      </FormControl>
      <CheckboxCategories categories={categoryList} filterlabel="category" />
    </Card>
  )
}

export default AddOffer

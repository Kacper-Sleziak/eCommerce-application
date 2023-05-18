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
  return (
    <Card sx={{ maxWidth: '60%' }}>
      <div className="marginAddOfferTitle">
        <Typography variant="h3">Add offer</Typography>
      </div>
      <div className="formFlexAddOffer">
        <AddPhoto />
        {/* <Button
          variant="outlined"
          sx={{
            width: '400px',
            height: '300px',
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
        </Button> */}
      </div>
      <div className="formFlexAddOfferInputs">
        <FormControl>
          <InputLabel>Name</InputLabel>
          <Input color="warning" />
          <FormHelperText>Enter the title of the product</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel>Description</InputLabel>
          <Input color="warning" multiline />
          <FormHelperText>Enter the description of the product</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel>Quantity</InputLabel>
          <Input color="warning" />
          <FormHelperText>Enter the quantity of the product</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel>Total price</InputLabel>
          <Input color="warning" />
          <FormHelperText>Enter the total price of the product</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel>Sale type</InputLabel>
          <Input color="warning" />
          <FormHelperText>Enter the sale type of the product</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel>Seller id</InputLabel>
          <Input color="warning" />
          <FormHelperText>Enter the seller id of the product</FormHelperText>
        </FormControl>
        <Categories categories={categories} />
      </div>
      <div className="addOfferButton">
        <Button
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

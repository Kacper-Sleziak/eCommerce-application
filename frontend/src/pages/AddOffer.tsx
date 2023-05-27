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
import AddPhoto, { Photo } from '../features/AddOffer/AddPhoto'
import Categories from '../features/AddOffer/Categories'
import { useEffect, useState, useReducer } from 'react'
import { useAddProductMutation, useGetCategoriesQuery, useGetColorsQuery } from '../store/services/OfferListDataApi'

interface IFormData {
  name: string
  description: string
  quantity: number
  totalPrice: number
  brand: string
  categories: number[]
  colors: number[]
}


const getBase64FromUrl = async (url: string) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    }
  });
}

const savePhotosAsBase64 = async (photos: Photo[]) => {
  const promises = photos.map((photo: Photo) => {
    return getBase64FromUrl(photo.url);
  });

  return await Promise.all(promises);
}

const AddOffer = () => {
  const [addProduct, addProductResult] = useAddProductMutation();

  const [photos, setPhotos] = useState<Photo[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [colors, setColors] = useState<string[]>([])

  const { data: colorsData } = useGetColorsQuery({})
  const { data: categoriesData } = useGetCategoriesQuery({})


  const addPhotos = (newPhotos: Photo[]) => {
    setPhotos([...photos, ...newPhotos])
  }

  useEffect(() => {
    if (categoriesData) {
      const newCategories = Object.values(categoriesData).map((category) => (category.name))
      setCategories(newCategories)
    }
  }, [categoriesData])

  useEffect(() => {
    if (colorsData) {
      const newColors = Object.values(colorsData).map((color) => (color.name))
      setColors(newColors)
    }
  })

  useEffect(() => {
    console.log({ addProductResult });

    console.log({ colorsData });
    console.log({ categoriesData });

  }, [addProductResult])

  const handleSubmit = () => {

    savePhotosAsBase64(photos).then((photosAsBase64) => {

      const body = {
        "categories": data.categories,
        "colors": data.colors,
        "photos": photosAsBase64
      }

      addProduct({
        ...data,
        body
      })

    })
  }

  const [data, updateData] = useReducer(
    (state: IFormData, action) => {
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
        case 'categories':
          break
        default:
          return updateData
      }
      return updateData
    },

    {
      name: 'olga',
      description: 'xd',
      quantity: 3,
      totalPrice: 50,
      brand: 'xd',
      categories: [2],
      colors: [2],
    }
  )



  return (
    <Card sx={{ maxWidth: '60%' }}>
      <div className="marginAddOfferTitle">
        <Typography variant="h3">Add offer</Typography>
      </div>
      <div className="formFlexAddOffer">
        <AddPhoto addPhotos={addPhotos} photos={photos} />
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
        <Categories categories={categories} categoriesName='Categories' />
        <Categories categories={colors} categoriesName='Colors' />
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

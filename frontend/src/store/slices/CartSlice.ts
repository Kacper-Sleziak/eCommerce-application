import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface IState {
  items: IItem[]
}

export interface IItem {
  name: string
  brand: string
  product_description: string
  quantity: number
  total_price: number
  sale_type: string
  photos: IPhoto
}

export interface IPhoto {
  id: number
  content: string
  product_id: number
}

const initialState: IState = {
  items: [],
}

export const CartSlice = createSlice({
  name: 'cartData',
  initialState,
  reducers: {
    addItemToCart: (state: any, action: PayloadAction<IItem>) => {
      const item = action.payload
      state.items = [...state.items, item]
    },
  },
})

export const { addItemToCart } = CartSlice.actions

export const selectCart = (state: { cartData: IState }) => {
  return state.cartData.items
}

export default CartSlice.reducer

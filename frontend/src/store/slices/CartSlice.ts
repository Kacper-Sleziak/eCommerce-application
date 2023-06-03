import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface IState {
  items: IItem[]
}

export interface IItem {
  id: number
  name: string
  brand: string
  product_description: string
  amount: number
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
      let isItemInCart = false

      state.items.array.forEach((element: IItem) => {
        if (element.id === item.id) {
          isItemInCart = true
          element.amount += item.amount
        }
      })

      if (!isItemInCart) {
        state.items = [...state.items, item]
      }
    },
    clearCart: (state: any) => {
      state = initialState
    },
  },
})

export const { addItemToCart, clearCart } = CartSlice.actions

export const selectCart = (state: { cartData: IState }) => {
  return state.cartData.items
}

export default CartSlice.reducer

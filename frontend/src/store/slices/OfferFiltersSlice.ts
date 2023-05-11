/* eslint-disable */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface UpdateFiltersPayload {
  filterName: string
  data: Array<string>
}

const initialState: any = {
  offerFilters: {
    brand: [],
    year: [],
    color: [],
    category: [],
  },
}

export const OfferFiltersSLice = createSlice({
  name: 'offerFiltersData',
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<UpdateFiltersPayload>) => {
      const { filterName, data } = action.payload

      switch (filterName) {
        case 'brand':
          state.offerFilters.brand = data
          break
        case 'year':
          state.offerFilters.year = data
          break
        case 'color':
          state.offerFilters.color = data
          break
        case 'category':
          state.offerFilters.category = data
          break
      }
    },
  },
})

export const { updateFilters } = OfferFiltersSLice.actions

export const selectOfferFilters = (state: any) => {
  return state.offerFiltersData.offerFilters
}

export default OfferFiltersSLice.reducer

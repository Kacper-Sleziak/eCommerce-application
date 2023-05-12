import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface IUpdateFiltersPayload {
  filterName: string
  data: string[]
}

export interface IFIltersState {
  brand: string[]
  year: string[]
  color: string[]
  category: string[]
  pagination: number
}

const initialState: IFIltersState = {
  brand: [],
  year: [],
  color: [],
  category: [],
  pagination: 1,
}

export const OfferFiltersSLice = createSlice({
  name: 'offerFiltersData',
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<IUpdateFiltersPayload>) => {
      const { filterName, data } = action.payload

      switch (filterName) {
        case 'brand':
          state.brand = data
          break
        case 'year':
          state.year = data
          break
        case 'color':
          state.color = data
          break
        case 'category':
          state.category = data
          break
        default:
      }
    },
    updatePagination: (state, action: PayloadAction<number>) => {
      state.pagination = action.payload
    },
  },
})

export const { updateFilters, updatePagination } = OfferFiltersSLice.actions

export const selectOfferFilters = (state: {
  offerFiltersData: IFIltersState
}) => {
  return state.offerFiltersData
}

export default OfferFiltersSLice.reducer

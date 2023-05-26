import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface IUpdateFiltersPayLoad {
  filterName: string
  data: string[]
}

export interface IUpdateOrderingLoad {
  orderBy: string
  order: string
}

export interface IPaginationState {
  page: number
  limit: number
}

export interface IOrdering {
  order_by: string
  order: string
}

export interface IFiltersState {
  brand: string[]
  year: string[]
  color: string[]
  category: string[]
}

export interface IState {
  filters: IFiltersState | null
  pagination: IPaginationState
  ordering: IOrdering | null
}

const initialState: IState = {
  filters: {
    brand: [],
    year: [],
    color: [],
    category: [],
  },
  pagination: {
    page: 1,
    limit: 10,
  },
  ordering: {
    order_by: 'total_price',
    order: 'ASC',
  },
}

export const OfferFiltersSLice = createSlice({
  name: 'offerFiltersData',
  initialState,
  reducers: {
    updateFilters: (
      state: any,
      action: PayloadAction<IUpdateFiltersPayLoad>,
    ) => {
      const { filterName, data } = action.payload
      switch (filterName) {
        case 'brand':
          state.filters.brand = data
          break
        case 'year':
          state.filters.year = data
          break
        case 'color':
          state.filters.color = data
          break
        case 'category':
          state.filters.category = data
          break
        default:
      }
    },
    updatePage: (state: any, action: PayloadAction<number>) => {
      state.pagination.page = action.payload
    },
    updatePaginationLimit: (state: any, action: PayloadAction<number>) => {
      state.pagination.limit = action.payload
    },
    updateOrdering: (
      state: any,
      action: PayloadAction<IUpdateOrderingLoad>,
    ) => {
      const { orderBy, order } = action.payload
      state.ordering.order_by = orderBy
      state.ordering.order = order
    },
  },
})

export const {
  updateFilters,
  updatePage,
  updatePaginationLimit,
  updateOrdering,
} = OfferFiltersSLice.actions

export const selectOffersData = (state: { offerFiltersData: IState }) => {
  const mergedOfferData: any = {
    ...state.offerFiltersData.filters,
    ...state.offerFiltersData.pagination,
    ...state.offerFiltersData.ordering,
  }
  return mergedOfferData
}

export const selectOrdering = (state: { offerFiltersData: IState }) => {
  return state.offerFiltersData.ordering
}

export const selectOfferFilters = (state: { offerFiltersData: IState }) => {
  return state.offerFiltersData.filters
}

export const selectPagination = (state: { offerFiltersData: IState }) => {
  return state.offerFiltersData.pagination
}

export default OfferFiltersSLice.reducer

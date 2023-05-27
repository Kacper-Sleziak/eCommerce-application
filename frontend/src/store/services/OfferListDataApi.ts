import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BACKEND_BASE_URL } from '../../config/backend'

export const offerListDataApi = createApi({
  reducerPath: 'offerListDataApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_BASE_URL,
  }),

  endpoints: (builder) => ({
    getOfferList: builder.query({
      query: (params: string) => `products?${params}`,
    }),
    getOffersCount: builder.query({
      query: () => 'products/count',
    }),
  }),
})

export const { useGetOfferListQuery, useGetOffersCountQuery } = offerListDataApi

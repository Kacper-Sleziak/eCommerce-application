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
      query: (params: string) => `products/count?${params}`,
    }),

    addProduct: builder.mutation({
      query: (params: {
        name: string
        brand: string
        description: string
        quantity: number
        totalPrice: number
        body: {
          categories: number[]
          colors: number[]
          photos: string[]
        }
      }) => ({
        url: `products/?seller_id=1&name=${params.name}&brand=${params.brand}&description=${params.description}&quantity=${params.quantity}&total_price=${params.totalPrice}`,
        method: 'POST',
        body: params.body,
      }),
    }),

    getProductById: builder.query({
      query: (productId: number) => `products/${productId}`,
    }),

    getCategories: builder.query({
      query: () => 'categories/',
    }),

    getColors: builder.query({
      query: () => 'colors/',
    }),

    getQA: builder.query({
      query: (productId: number) => `qa/${productId}`,
    }),

    addQuestion: builder.mutation({
      query: (body: { product_id: number; question: string }) => ({
        url: 'qa/',
        method: 'POST',
        body,
      }),
    }),

    addAnswer: builder.mutation({
      query: (params: { questionId: number; answer: string }) => ({
        url: `qa/${params.questionId}?answer=${params.answer}`,
        method: 'PUT',
      }),
    }),
  }),
})

export const {
  useGetOfferListQuery,
  useGetOffersCountQuery,
  useAddProductMutation,
  useGetColorsQuery,
  useGetCategoriesQuery,
  useGetProductByIdQuery,
  useGetQAQuery,
  useAddQuestionMutation,
  useAddAnswerMutation,
} = offerListDataApi

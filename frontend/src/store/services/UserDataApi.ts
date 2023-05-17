import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BACKEND_BASE_URL } from '../../config/backend'

export const userAccountApi = createApi({
  reducerPath: 'userAccountApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_BASE_URL}/auth`,
  }),

  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (params) => ({
        url: 'signup',
        method: 'POST',
        body: params.body,
      }),
    }),

    signIn: builder.mutation({
      query: (params) => ({
        url: 'login',
        method: 'POST',
        body: params.body,
      })
    })
  }),
})

export const { useSignUpMutation, useSignInMutation } = userAccountApi

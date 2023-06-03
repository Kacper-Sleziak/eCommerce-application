import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BACKEND_BASE_URL } from '../../config/backend'

export const userAccountApi = createApi({
  reducerPath: 'userAccountApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_BASE_URL}`,
  }),

  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (params) => ({
        url: 'auth/signup',
        method: 'POST',
        body: params.body,
      }),
    }),

    signIn: builder.mutation({
      query: (params) => ({
        url: 'auth/login',
        method: 'POST',
        body: params.body,
      }),
    }),

    getMe: builder.query({
      query: (token) => {
        return {
          url: 'users/me/',
          headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
          },
        }
      },
    }),
  }),
})

export const { useSignUpMutation, useSignInMutation, useGetMeQuery } =
  userAccountApi

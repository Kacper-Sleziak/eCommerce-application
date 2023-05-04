import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// TO TYLKO PRZYKLAD

export const userAccountApi = createApi({
  reducerPath: 'userAccountApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://official-joke-api.appspot.com',
    // prepareHeaders: (headers, { getState }) => {
    //   headers.set('Authorization', `Bearer ${(getState()).usersData.accessToken}`)
    //   return headers
    // }
  }),

  endpoints: (builder) => ({
    getRandomJoke: builder.mutation({
      query: () => ({
        url: 'random_joke',
      }),
    }),

    // tutaj poglądowe definicje innych endpointów

    // updateDroneById: builder.mutation({
    //   query: (params) => ({
    //     url: `add/drone/?_id=${params.id}`,
    //     method: 'PUT',
    //     body: params.body,https://official-joke-api.appspot.com/random_joke
    //   })
    // }),

    // deleteDroneById: builder.mutation({
    //   query: (params) => ({
    //     url: `add/drone/?_id=${params.id}`,
    //     method: 'DELETE',
    //   })
    // }),

    // addDrone: builder.mutation({
    //   query: (params) => ({
    //     url: `add/drone/`,
    //     method: 'POST',
    //     body: params.body,
    //   })
    // })
  }),
})

export const { useGetRandomJokeMutation } = userAccountApi

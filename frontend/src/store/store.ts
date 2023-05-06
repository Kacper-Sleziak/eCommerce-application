import { configureStore } from '@reduxjs/toolkit'
import { userAccountApi } from './services/UserDataApi'
import { offerListDataApi } from './services/OfferListDataApi'
import UserDataReducer from './slices/UserDataSlice'

const store = configureStore({
  reducer: {
    userData: UserDataReducer,
    [userAccountApi.reducerPath]: userAccountApi.reducer,
    [offerListDataApi.reducerPath]: offerListDataApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userAccountApi.middleware)
      .concat(offerListDataApi.middleware),
})

export default store

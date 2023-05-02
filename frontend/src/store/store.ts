import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userAccountApi } from './userData/UserDataApi'
import UserDataReducer from './userData/UserDataSlice'

const store = configureStore({
  reducer: {
    userData: UserDataReducer,
    [userAccountApi.reducerPath]: userAccountApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAccountApi.middleware),
})

export default store

setupListeners(store.dispatch)
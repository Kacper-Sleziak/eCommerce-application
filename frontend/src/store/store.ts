import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import UserDataReducer from './userData/UserDataSlice'

const store = configureStore({
  reducer: {
    userData: UserDataReducer,
  },
})

export default store

setupListeners(store.dispatch)

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { userAccountApi } from './services/UserDataApi'
import { offerListDataApi } from './services/OfferListDataApi'
import UserDataReducer from './slices/UserDataSlice'
import OfferFiltersReducer from './slices/OfferFiltersSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedUserDataReducer = persistReducer(persistConfig, UserDataReducer)
const persistedOfferFiltersReducer = persistReducer(
  persistConfig,
  OfferFiltersReducer,
)

const rootReducer = combineReducers({
  userData: persistedUserDataReducer,
  offerFiltersData: persistedOfferFiltersReducer,
  [userAccountApi.reducerPath]: userAccountApi.reducer,
  [offerListDataApi.reducerPath]: offerListDataApi.reducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userAccountApi.middleware)
      .concat(offerListDataApi.middleware),
})

export default store
// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, {
//   // userData: UserDataReducer,
//   offerFiltersData: OfferFiltersReducer,
//   [userAccountApi.reducerPath]: userAccountApi.reducer,
//   [offerListDataApi.reducerPath]: offerListDataApi.reducer,
// });

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware()
//       .concat(userAccountApi.middleware)
//       .concat(offerListDataApi.middleware),
// });

const persistor = persistStore(store)
export { persistor }

// const store = configureStore({
//   reducer: {
//     userData: UserDataReducer,
//     offerFiltersData: OfferFiltersReducer,
//     [userAccountApi.reducerPath]: userAccountApi.reducer,
//     [offerListDataApi.reducerPath]: offerListDataApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware()
//       .concat(userAccountApi.middleware)
//       .concat(offerListDataApi.middleware),
// })

// export default store

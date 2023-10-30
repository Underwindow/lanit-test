import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { appSlice } from '@store/slices/app'

const rootReducer = combineReducers({
  app: appSlice.reducer,
})

export const setupStore = (initialState = {}) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })

type RootState = ReturnType<typeof rootReducer>
type AppStore = ReturnType<typeof setupStore>
type AppDispatch = AppStore['dispatch']

export type { AppDispatch, AppStore, RootState }

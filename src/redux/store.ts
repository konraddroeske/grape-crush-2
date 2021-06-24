import { configureStore, ThunkAction } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import type { Action } from 'redux'

import { globalSlice } from '@redux/globalSlice'
import { heroSlice } from '@redux/heroSlice'
import { productsSlice } from '@redux/productsSlice'
import { socialSlice } from '@redux/socialSlice'

const makeStore = () =>
  configureStore({
    reducer: {
      [globalSlice.name]: globalSlice.reducer,
      [heroSlice.name]: heroSlice.reducer,
      [productsSlice.name]: productsSlice.reducer,
      [socialSlice.name]: socialSlice.reducer,
    },
    devTools: true,
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>

export const wrapper = createWrapper<AppStore>(makeStore)

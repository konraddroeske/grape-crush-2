import { configureStore, ThunkAction } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import type { Action } from 'redux'

import { aboutSlice } from '@redux/aboutSlice'
import { clientSlice } from '@redux/clientSlice'
import { contactSlice } from '@redux/contactSlice'
import { faqSlice } from '@redux/faqSlice'
import { globalSlice } from '@redux/globalSlice'
import { heroSlice } from '@redux/heroSlice'
import { indexSlice } from '@redux/indexSlice'
import { itemSlice } from '@redux/itemSlice'
import { productsSlice } from '@redux/productsSlice'
import { socialSlice } from '@redux/socialSlice'

const makeStore = () =>
  configureStore({
    reducer: {
      [globalSlice.name]: globalSlice.reducer,
      [heroSlice.name]: heroSlice.reducer,
      [indexSlice.name]: indexSlice.reducer,
      [socialSlice.name]: socialSlice.reducer,
      [productsSlice.name]: productsSlice.reducer,
      [faqSlice.name]: faqSlice.reducer,
      [clientSlice.name]: clientSlice.reducer,
      [aboutSlice.name]: aboutSlice.reducer,
      [contactSlice.name]: contactSlice.reducer,
      [itemSlice.name]: itemSlice.reducer,
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

import { configureStore, ThunkAction } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper"
import { Action } from "redux"

// eslint-disable-next-line import/no-cycle
import { heroSlice } from "@redux/heroSlice"

const makeStore = () =>
  configureStore({
    reducer: {
      [heroSlice.name]: heroSlice.reducer,
    },
    devTools: true,
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore["getState"]>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>

export const wrapper = createWrapper<AppStore>(makeStore)

import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { Shop } from '@models/ambassador'
import type { AppState } from '@redux/store'

// export const setNewArrivals = (newArrivals: any[]): AppThunk => {
//   return async (dispatch) => {
//     dispatch(
//       productsSlice.actions.setNewArrivals({
//         newArrivals,
//       })
//     )
//   }
// }
// interface NewArrival {
//   title: string
//   url: string
//   description: string
// }

interface ProductsSlice {
  newArrivals: Shop[]
}

const initialState = {
  newArrivals: [],
} as ProductsSlice

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setNewArrivals(state, action) {
      // console.log('Setting new arrivals')
      return { ...state, newArrivals: action.payload }
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.products,
      }
    },
  },
})

export const { setNewArrivals } = productsSlice.actions

export const selectProducts = () => (state: AppState) =>
  state?.[productsSlice.name]

import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { CmsAssets } from '@lib/cms'
import { ProductLowercase } from '@models/ambassador'
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

interface IndexSlice {
  newArrivals: ProductLowercase[] | null
  infoBox1: CmsAssets | null
  infoBox2: CmsAssets | null
  infoBox3: CmsAssets | null
}

const initialState: IndexSlice = {
  newArrivals: null,
  infoBox1: null,
  infoBox2: null,
  infoBox3: null,
}

export const indexSlice = createSlice({
  name: 'index',
  initialState,
  reducers: {
    setNewArrivals(state, action) {
      return { ...state, newArrivals: action.payload }
    },
    setInfoBoxes(state, action) {
      const locale = 'en-US'

      const [infoBox1, infoBox2, infoBox3] = action.payload.sort(
        (a: CmsAssets, b: CmsAssets) => {
          return a.order[locale] - b.order[locale]
        }
      )

      return { ...state, infoBox1, infoBox2, infoBox3 }
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.index,
      }
    },
  },
})

export const { setNewArrivals, setInfoBoxes } = indexSlice.actions

export const selectIndex = () => (state: AppState) => state?.[indexSlice.name]

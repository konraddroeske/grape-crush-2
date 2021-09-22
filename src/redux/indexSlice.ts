import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { ProductLowercase } from '@models/ambassador'
import { IInfoBox1Fields } from '@models/contentful'
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
  infoBox1: IInfoBox1Fields | null
  infoBox2: IInfoBox1Fields | null
  infoBox3: IInfoBox1Fields | null
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

      const infoBoxes = action.payload as IInfoBox1Fields[]

      const [infoBox1, infoBox2, infoBox3] = infoBoxes.sort(
        (a: IInfoBox1Fields, b: IInfoBox1Fields) => {
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

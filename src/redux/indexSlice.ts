import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { ProductLowercase } from '@models/ambassador'
import { Asset, IInfoBox1Fields } from '@models/contentful-graph'
import type { AppState } from '@redux/store'

interface IndexSlice {
  newArrivals: ProductLowercase[] | null
  infoBox1: IInfoBox1Fields | null
  infoBox2: IInfoBox1Fields | null
  infoBox3: IInfoBox1Fields | null
  houseWines: Asset[]
  bgLime: boolean
}

const initialState: IndexSlice = {
  newArrivals: null,
  infoBox1: null,
  infoBox2: null,
  infoBox3: null,
  houseWines: [],
  bgLime: false,
}

export const indexSlice = createSlice({
  name: 'index',
  initialState,
  reducers: {
    setBgLime(state, action) {
      return { ...state, bgLime: action.payload }
    },
    // setNewArrivals(state, action) {
    //   return { ...state, newArrivals: action.payload }
    // },
    setInfoBoxes(state, action) {
      // const locale = 'en-US'
      const { items } = action.payload
      const infoBoxes = items as IInfoBox1Fields[]

      const [infoBox1, infoBox2, infoBox3] = [...infoBoxes].sort(
        (a: IInfoBox1Fields, b: IInfoBox1Fields) => {
          return a.order - b.order
        }
      )

      return {
        ...state,
        infoBox1,
        infoBox2,
        infoBox3,
      }
    },
    setHouseWines(state, action) {
      const { items } = action.payload
      return { ...state, houseWines: items }
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

export const { setInfoBoxes, setHouseWines, setBgLime } = indexSlice.actions

export const selectIndex = () => (state: AppState) => state?.[indexSlice.name]

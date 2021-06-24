import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { CmsAssets } from '@lib/cms'
import { Category, Shop } from '@models/ambassador'
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

interface MatchedCategory extends CmsAssets {
  tags: string[]
  id: string
}

interface ProductsSlice {
  newArrivals: Shop | null
  categories: MatchedCategory[]
  infoBox1: CmsAssets | null
  infoBox2: CmsAssets | null
  infoBox3: CmsAssets | null
}

const initialState: ProductsSlice = {
  newArrivals: null,
  categories: [],
  infoBox1: null,
  infoBox2: null,
  infoBox3: null,
}

export const productsSlice = createSlice({
  name: 'products',
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
    setCategories(state, action) {
      const {
        categories,
        categoryAssets,
        locale,
      }: {
        categories: Category[]
        categoryAssets: CmsAssets[]
        locale: string
      } = action.payload

      const merged = categoryAssets
        .map((entry) => {
          const { categoryName } = entry
          const match = categories.find(
            (category) => category.label === categoryName[locale]
          )

          if (match) {
            const { tags, id } = match
            return {
              ...entry,
              tags,
              id,
            }
          }

          return null
        })
        .filter((category): category is MatchedCategory => !!category)

      return { ...state, categories: merged }
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

export const { setNewArrivals, setCategories, setInfoBoxes } =
  productsSlice.actions

export const selectProducts = () => (state: AppState) =>
  state?.[productsSlice.name]
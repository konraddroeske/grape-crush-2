import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { ProductLowercase } from '@models/ambassador'
import type { AppState } from '@redux/store'

interface ItemSlice {
  suggestedProducts: ProductLowercase[]
}

const initialState = {
  suggestedProducts: [],
} as ItemSlice

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setSuggestedProducts(state, action) {
      const {
        currentProduct,
        products,
      }: { currentProduct: ProductLowercase; products: ProductLowercase[] } =
        action.payload

      const compareArrs = (a1: string[], a2: string[]) =>
        a1.filter((val) => a2.includes(val)).length

      const rankedProducts = products
        .filter(
          (product) =>
            product.data.imageUrl.length > 0 &&
            product._id !== currentProduct._id
        )
        .map((product) => {
          let count = 0
          const { type: parentType, data } = product
          const { country, type, varietal, category, style, tags } = data

          if (parentType === currentProduct.type) {
            count += 1
          }

          if (currentProduct.data.category === category) {
            count += 1
          }

          count += compareArrs(currentProduct.data.country, country)
          count += compareArrs(currentProduct.data.type, type)
          count += compareArrs(currentProduct.data.varietal, varietal)
          count += compareArrs(currentProduct.data.style, style)
          count += compareArrs(currentProduct.data.tags, tags)

          return { ...product, count }
        })
        .sort((a, b) => {
          return b.count - a.count
        })
        .slice(0, 8)

      return { ...state, suggestedProducts: rankedProducts }
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.item,
      }
    },
  },
})

export const { setSuggestedProducts } = itemSlice.actions

export const selectItem = () => (state: AppState) => state?.[itemSlice.name]

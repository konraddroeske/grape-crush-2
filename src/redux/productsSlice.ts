import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { CmsAssets } from '@lib/cms'
import { Category, Product, ProductCategories, Shop } from '@models/ambassador'
import type { AppState } from '@redux/store'

interface MatchedCategory extends CmsAssets {
  tags: string[]
  id: string
}

interface TagsByCategory {
  style: string[]
  country: string[]
  varietal: string[]
}

interface TagsByCount {
  style: Record<string, number>
  country: Record<string, number>
  varietal: Record<string, number>
}

interface ProductsSlice {
  categories: MatchedCategory[]
  products: Product[]
  allTags: TagsByCount | null
}

const initialState: ProductsSlice = {
  categories: [],
  products: [],
  allTags: null,
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
    setProducts(state, action) {
      const { shops }: { shops: Shop[] } = action.payload
      const [shop] = shops
      const { products } = shop

      // console.log('setting products', products)

      return { ...state, products }
    },
    setAllTags(state, action) {
      const { shops }: { shops: Shop[] } = action.payload
      const [shop] = shops
      const { products } = shop

      const getCategories = (
        acc: TagsByCategory,
        cur: Product,
        category: ProductCategories
      ) => {
        if (cur.data?.[category]) {
          const tagCategory = category.toLowerCase() as keyof TagsByCategory
          const mergedCategories = acc[tagCategory]
            ? acc[tagCategory].concat(cur.data[category])
            : cur.data[category]

          return { ...acc, [category.toLowerCase()]: mergedCategories }
        }

        return acc
      }

      const categories: ProductCategories[] = ['Style', 'Varietal', 'Country']

      const tagsByCategory = products.reduce((acc, cur) => {
        const newAcc = categories.reduce((childAcc, childCur) => {
          return getCategories(childAcc, cur, childCur)
        }, acc as TagsByCategory)

        if (Object.keys(newAcc).length !== 0) {
          return newAcc
        }

        return acc
      }, {} as TagsByCategory)

      const tagsByCount = Object.entries(tagsByCategory).reduce(
        (parentAcc, category) => {
          const [name, tags]: [string, string[]] = category

          const count = tags.reduce((childAcc: Record<string, number>, tag) => {
            return { ...childAcc, [tag]: (childAcc[tag] || 0) + 1 }
          }, {})

          return { ...parentAcc, [name]: count }
        },
        {} as TagsByCount
      )

      return { ...state, allTags: tagsByCount }
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

export const { setCategories, setAllTags, setProducts } = productsSlice.actions

export const selectProducts = () => (state: AppState) =>
  state?.[productsSlice.name]

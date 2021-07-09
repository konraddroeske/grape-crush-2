import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { CmsAssets } from '@lib/cms'
import { Category, Product, Shop } from '@models/ambassador'
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

interface IndexSlice {
  categories: MatchedCategory[]
  styles: Record<string, number> | null
  allTags: TagsByCount | null
}

const initialState: IndexSlice = {
  categories: [],
  styles: null,
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
    setAllTags(state, action) {
      const { shops }: { shops: Shop[] } = action.payload
      const [shop] = shops
      const { products } = shop

      const getCategories = (
        acc: TagsByCategory,
        cur: Product,
        category: 'Style' | 'Varietal' | 'Country'
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

      const tagsByCategory = products.reduce((acc, cur) => {
        const accWithStyle = getCategories(acc, cur, 'Style')
        const accWithVarietal = getCategories(accWithStyle, cur, 'Varietal')
        const accWithCountry = getCategories(accWithVarietal, cur, 'Country')

        if (Object.keys(accWithCountry).length !== 0) {
          return accWithCountry
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
    setTags(state, action) {
      const { shops }: { shops: Shop[] } = action.payload
      const [shop] = shops
      const { products } = shop
      const styles = products.flatMap((product) => {
        if (product.data?.Style) {
          return product.data.Style
        }

        return []
      })

      const stylesCount = styles.reduce((prev: Record<string, number>, cur) => {
        return { ...prev, [cur]: (prev[cur] || 0) + 1 }
      }, {})

      return { ...state, styles: stylesCount }
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

export const { setCategories, setTags, setAllTags } = productsSlice.actions

export const selectProducts = () => (state: AppState) =>
  state?.[productsSlice.name]

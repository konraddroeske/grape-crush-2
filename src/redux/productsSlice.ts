import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { CmsAssets } from '@lib/cms'
import {
  Category,
  ProductCategories,
  ProductLowercase,
} from '@models/ambassador'
import type { AppState } from '@redux/store'

interface MatchedCategory extends CmsAssets {
  tags: string[]
  id: string
}

export interface TagsByCategory {
  type: string[]
  style: string[]
  country: string[]
  varietal: string[]
  range: string[]
}

export interface TagsByCount {
  style: Record<string, number>
  country: Record<string, number>
  varietal: Record<string, number>
  type: Record<string, number>
  range: Record<string, number>
}

interface ProductsSlice {
  categories: MatchedCategory[]
  products: ProductLowercase[]
  allTags: TagsByCount | null
  selectedProducts: ProductLowercase[]
  totalSelected: number
  selectedTags: TagsByCategory
  page: number
  productsPerPage: number
  productsSearch: string
}

const initialState: ProductsSlice = {
  categories: [],
  products: [],
  allTags: null,
  selectedProducts: [],
  totalSelected: 0,
  selectedTags: {
    type: [],
    style: [],
    country: [],
    varietal: [],
    range: [],
  },
  page: 1,
  productsPerPage: 25,
  productsSearch: '',
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
      return { ...state, products: action.payload }
    },
    handleProducts(state, action) {
      const { products } = state
      const selectedTagsObj = action.payload as TagsByCategory
      const selectedTagsCategories = Object.keys(selectedTagsObj)
      const selectedTags = Object.values(selectedTagsObj).flat()

      const selectedProducts =
        selectedTags.length === 0
          ? products
          : products.filter((product) => {
              const { data } = product

              const productTags = Object.entries(data).reduce((acc, cur) => {
                if (selectedTagsCategories.includes(cur[0])) {
                  const tags = cur[1] as string[]
                  return [...acc, ...tags]
                }

                return acc
              }, [] as string[])

              return selectedTags.every((ele) => productTags.includes(ele))
            })

      const maxPage = Math.ceil(selectedProducts.length / state.productsPerPage)

      if (state.page !== 1 && state.page >= maxPage) {
        const lastPageStart =
          selectedProducts.length -
          (selectedProducts.length % state.productsPerPage)
        const selectedProductsByPage = selectedProducts.slice(lastPageStart)
        return {
          ...state,
          page: maxPage,
          selectedProducts: selectedProductsByPage,
          totalSelected: selectedProducts.length,
        }
      }

      const start = (state.page - 1) * state.productsPerPage
      const end = state.page * state.productsPerPage

      const selectedProductsByPage = selectedProducts.slice(start, end)

      return {
        ...state,
        selectedProducts: selectedProductsByPage,
        totalSelected: selectedProducts.length,
      }
    },
    setAllTags(state, action) {
      const products = action.payload as ProductLowercase[]

      const getCategories = (
        acc: TagsByCategory,
        cur: ProductLowercase,
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

      const categories: ProductCategories[] = [
        'type',
        'style',
        'varietal',
        'country',
        'range',
      ]

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
    handleTags(state, action) {
      const { selectedTags } = state

      const tags = action.payload as Record<string, string>

      const sortedTags = Object.entries(selectedTags).reduce((acc, cur) => {
        const isCategory = Object.keys(tags).includes(cur[0])

        if (isCategory) {
          const splitTags = tags[cur[0]].split(',')

          return { ...acc, [cur[0]]: splitTags }
        }

        return { ...acc, [cur[0]]: [] }
      }, {} as TagsByCategory)

      return { ...state, selectedTags: sortedTags }
    },
    handlePage(state, action) {
      // console.log('handle page', action.payload)
      const page = action.payload || 1
      return { ...state, page }
    },
    resetTags(state) {
      return {
        ...state,
        selectedTags: {
          type: [],
          style: [],
          country: [],
          varietal: [],
          range: [],
        },
      }
    },
    handleProductsSearch(state, action) {
      const { selectedProducts } = state

      // console.log(action.payload)

      return { ...state, selectedProducts, productsSearch: action.payload }
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

export const {
  setCategories,
  setAllTags,
  setProducts,
  handleTags,
  resetTags,
  handleProducts,
  handlePage,
  handleProductsSearch,
} = productsSlice.actions

export const selectProducts = () => (state: AppState) =>
  state?.[productsSlice.name]

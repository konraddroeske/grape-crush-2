import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { CmsAssets } from '@lib/cms'
import { sortProducts } from '@lib/sortProducts'
import { ProductCategories, ProductLowercase } from '@models/ambassador'
import type { AppState } from '@redux/store'

// interface MatchedCategory extends CmsAssets {
//   tags: string[]
//   id: string
// }

export interface TagsByCategory {
  parentType: string[]
  category: string[]
  type: string[]
  style: string[]
  country: string[]
  varietal: string[]
  range: string[]
}

export interface TagsByCount {
  parentType: Record<string, number>
  category: Record<string, number>
  style: Record<string, number>
  country: Record<string, number>
  varietal: Record<string, number>
  type: Record<string, number>
  range: Record<string, number>
}

// export interface ProductsByTag {
//   parentType: Record<string, ProductLowercase[]>
//   category: Record<string, ProductLowercase[]>
//   style: Record<string, ProductLowercase[]>
//   country: Record<string, ProductLowercase[]>
//   varietal: Record<string, ProductLowercase[]>
//   type: Record<string, ProductLowercase[]>
//   range: Record<string, ProductLowercase[]>
// }

export type SortOption =
  | 'alphabetical, a - z'
  | 'alphabetical, z - a'
  | 'price, high to low'
  | 'price, low to high'
  | 'date, new to old'
  | 'date, old to new'

interface ProductsSlice {
  categories: CmsAssets[]
  products: ProductLowercase[]
  allTags: TagsByCount | null
  // productsByTag: ProductsByTag | null
  selectedProducts: ProductLowercase[]
  totalSelected: ProductLowercase[]
  selectedTags: TagsByCategory
  page: number
  productsPerPage: number
  productsSearch: string
  productsSort: SortOption
  menuOpen: boolean
}

const initialState: ProductsSlice = {
  categories: [],
  products: [],
  allTags: null,
  // productsByTag: null,
  selectedProducts: [],
  totalSelected: [],
  selectedTags: {
    parentType: [],
    category: [],
    type: [],
    style: [],
    country: [],
    varietal: [],
    range: [],
  },
  page: 1,
  productsPerPage: 25,
  productsSearch: '',
  productsSort: 'alphabetical, a - z',
  menuOpen: true,
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
      return { ...state, categories: action.payload }
    },
    setProducts(state, action) {
      return { ...state, products: action.payload }
    },
    handleProducts(state, action) {
      const { products } = state
      const {
        selectedTags: selectedTagsObj,
        productsSearch,
        productsSort,
      }: {
        selectedTags: TagsByCategory
        productsSearch: string
        productsSort: SortOption
      } = action.payload

      const selectedTagsCategories = Object.keys(selectedTagsObj)
      const selectedTags = Object.values(selectedTagsObj).flat()

      const selectedProducts =
        selectedTags.length === 0
          ? products
          : products.filter((product) => {
              const { type, data } = product

              const productTags = Object.entries(data)
                .reduce((acc, cur) => {
                  if (selectedTagsCategories.includes(cur[0])) {
                    const tags = cur[1] as string[]
                    if (Array.isArray(tags)) {
                      return [...acc, ...tags]
                    }

                    return [...acc, tags]
                  }

                  return acc
                }, [] as string[])
                .concat([type])

              return selectedTags.every((ele) => productTags.includes(ele))
            })

      const searchedProducts =
        productsSearch.length === 0
          ? selectedProducts
          : selectedProducts.filter((product) => {
              const { data } = product
              const { name, description, country, tags } = data

              const compareString = (parent: string, child: string) =>
                parent ? parent.toLowerCase().includes(child) : false

              const compareArr = (arr: string[], child: string) =>
                arr.length > 0
                  ? arr.some((ele) => compareString(ele, child))
                  : false

              const inCountry = compareArr(country, productsSearch)
              const inTags = compareArr(tags, productsSearch)
              const inName = compareString(name, productsSearch)
              const inDescription = compareString(description, productsSearch)

              return inCountry || inTags || inName || inDescription
            })

      const sortedProducts = sortProducts([...searchedProducts], productsSort)

      const maxPage = Math.ceil(sortedProducts.length / state.productsPerPage)

      if (state.page !== 1 && state.page >= maxPage) {
        const lastPageStart =
          sortedProducts.length -
          (sortedProducts.length % state.productsPerPage)
        const sortedProductsByPage = sortedProducts.slice(lastPageStart)
        return {
          ...state,
          page: maxPage,
          selectedProducts: sortedProductsByPage,
          totalSelected: sortedProducts,
        }
      }

      const start = (state.page - 1) * state.productsPerPage
      const end = state.page * state.productsPerPage

      const sortedProductsByPage = sortedProducts.slice(start, end)

      return {
        ...state,
        selectedProducts: sortedProductsByPage,
        totalSelected: sortedProducts,
      }
    },
    setAllTags(state, action) {
      const products = action.payload as ProductLowercase[]

      const getCategories = (
        acc: TagsByCategory,
        cur: ProductLowercase,
        category: ProductCategories
      ) => {
        const tagCategory = category.toLowerCase() as keyof TagsByCategory

        if (cur.data?.[category]) {
          if (Array.isArray(cur.data[category])) {
            const mergedCategories = acc[tagCategory]
              ? acc[tagCategory].concat(cur.data[category])
              : cur.data[category]

            return { ...acc, [category.toLowerCase()]: mergedCategories }
          }

          const mergedCategories = Array.isArray(acc?.[tagCategory])
            ? [...acc[tagCategory], cur.data[category]]
            : [cur.data[category]]

          return { ...acc, [category.toLowerCase()]: mergedCategories }
        }

        return acc
      }

      const categories: ProductCategories[] = [
        'category',
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

        if (cur.type) {
          const mergedType =
            acc.parentType?.length > 0
              ? acc.parentType.concat([cur.type])
              : [cur.type]

          return { ...newAcc, parentType: mergedType }
        }

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
      const page = action.payload || 1
      return { ...state, page }
    },
    resetTags(state) {
      return {
        ...state,
        selectedTags: {
          parentType: [],
          category: [],
          type: [],
          style: [],
          country: [],
          varietal: [],
          range: [],
        },
      }
    },
    handleProductsSearch(state, action) {
      // console.log('handling products search', action.payload)
      return { ...state, productsSearch: action.payload }
    },
    handleProductsSort(state, action) {
      return { ...state, productsSort: action.payload }
    },
    handleMenuOpen(state) {
      const { menuOpen } = state
      return { ...state, menuOpen: !menuOpen }
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
  handleProductsSort,
  handleMenuOpen,
} = productsSlice.actions

export const selectProducts = () => (state: AppState) =>
  state?.[productsSlice.name]

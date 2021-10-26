import { createSlice } from '@reduxjs/toolkit'
import chunk from 'lodash.chunk'
import deburr from 'lodash.deburr'

import { sortProducts } from '@lib/sortProducts'
import { sortTags } from '@lib/sortTags'
import { ProductCategories, ProductLowercase } from '@models/ambassador'
import { Asset } from '@models/contentful-graph'
import type { AppState } from '@redux/store'

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

export type SortOption =
  | 'alphabetical, a - z'
  | 'alphabetical, z - a'
  | 'price, high to low'
  | 'price, low to high'
  | 'date, new to old'
  | 'date, old to new'

interface ProductsSlice {
  products: ProductLowercase[]
  allTags: TagsByCount | null
  selectedProductsByPage: ProductLowercase[][]
  totalSelected: ProductLowercase[]
  selectedTags: TagsByCategory
  totalSelectedTags: number
  page: number
  productsPerPage: number
  productsSearch: string
  productsSort: SortOption
  menuOpen: boolean
  mobileMenuOpen: boolean
  missingImage: Asset | null
}

const initialState: ProductsSlice = {
  products: [],
  allTags: null,
  selectedProductsByPage: [],
  totalSelected: [],
  totalSelectedTags: 0,
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
  productsPerPage: 48,
  productsSearch: '',
  productsSort: 'date, new to old',
  menuOpen: true,
  mobileMenuOpen: false,
  missingImage: null,
  // isLoading: true,
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      if (state.products.length > 0) return state
      // console.log('setting products')

      return { ...state, products: action.payload }
    },
    handleProducts(state, action) {
      // console.log('handling products')
      const { products, page, selectedTags: selectedTagsObj } = state

      const {
        productsSearch,
        productsSort,
      }: {
        productsSearch: string
        productsSort: SortOption
      } = action.payload

      // HANDLE TAGS

      const selectedTagsCategories = Object.entries(selectedTagsObj)
        .filter(([, value]) => value.length > 0)
        .map(([key]) => key)

      const selectedTags = Object.values(selectedTagsObj).flat()
      const totalSelectedTags = selectedTags.length

      const selectedProducts =
        selectedTags.length === 0
          ? products
          : products.filter((product) => {
              const { type, data } = product

              const productTags = Object.entries(data)
                .reduce((acc, cur) => {
                  if (selectedTagsCategories.includes(cur[0])) {
                    const tags = cur[1] as string | string[]

                    if (tags instanceof Array) {
                      return [...acc, ...tags]
                    }

                    return [...acc, tags]
                  }

                  return acc
                }, [] as string[])
                .concat([type])

              return selectedTags.every((ele) => productTags.includes(ele))
            })

      const compareString = (str: string, searchTerms: string[]) => {
        return searchTerms.every((val) => str.includes(val))
      }

      const compareArr = (arr: string[], searchTerms: string[]) => {
        return searchTerms.every((val) => arr.find((ele) => ele.includes(val)))
      }

      const searchTerms = productsSearch
        .split(' ')
        .map((term) => deburr(term.toLowerCase()))

      // HANDLE SEARCH

      const searchedProducts =
        productsSearch.length === 0
          ? selectedProducts
          : selectedProducts.filter((product) => {
              const { data } = product
              const { name, description, country, tags } = data

              const inCountry =
                country?.length > 0
                  ? compareArr(
                      country.map((val) => val.toLowerCase()),
                      searchTerms
                    )
                  : false

              const inTags =
                tags?.length > 0
                  ? compareArr(
                      tags.map((val) => val.toLowerCase()),
                      searchTerms
                    )
                  : false

              const inName = name
                ? compareString(deburr(name.toLowerCase()), searchTerms)
                : false

              const inDescription = description
                ? compareString(deburr(description.toLowerCase()), searchTerms)
                : false

              return inCountry || inTags || inName || inDescription
            })

      // HANDLE SORT

      const sortedProducts = sortProducts([...searchedProducts], productsSort)

      const selectedProductsByPage = chunk(
        sortedProducts,
        state.productsPerPage
      )

      // HANDLE PAGE

      const maxPage = selectedProductsByPage.length

      if (page !== 1 && page >= maxPage) {
        return {
          ...state,
          page: maxPage,
          selectedProductsByPage,
          totalSelected: sortedProducts,
          totalSelectedTags,
        }
      }

      return {
        ...state,
        selectedProductsByPage,
        totalSelected: sortedProducts,
        totalSelectedTags,
      }
    },
    setAllTags(state, action) {
      if (state.allTags) return state
      // console.log('setting all tags')

      const products = action.payload as ProductLowercase[]

      const getCategories = (
        acc: TagsByCategory,
        cur: ProductLowercase,
        category: ProductCategories
      ) => {
        const tagCategory = category.toLowerCase() as keyof TagsByCategory

        if (cur.data?.[category]) {
          if (cur.data[category] instanceof Array) {
            const mergedCategories = acc[tagCategory]
              ? acc[tagCategory].concat(cur.data[category])
              : cur.data[category]

            return { ...acc, [category.toLowerCase()]: mergedCategories }
          }

          const mergedCategories =
            acc?.[tagCategory] instanceof Array
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
      // console.log('handling tags')
      const { selectedTags } = state
      const newTags = action.payload as Record<string, string>

      const selectedTagsFlat = Object.values(selectedTags).flat().sort()
      const newTagsFlat = Object.values(newTags).flat().sort()

      if (selectedTagsFlat.length !== newTagsFlat.length) {
        return { ...state, selectedTags: sortTags(selectedTags, newTags) }
      }

      const isEqual = selectedTagsFlat.every(
        (value, index) => value === newTagsFlat[index]
      )

      if (isEqual) return state

      return { ...state, selectedTags: sortTags(selectedTags, newTags) }
    },
    handlePage(state, action) {
      if (state.page === action.payload) return state
      if (action.payload <= 0) return { ...state, page: 1 }

      return { ...state, page: action.payload }
    },
    resetTags(state) {
      if (Object.values(state.selectedTags).flat().length === 0) return state
      // console.log('resetting tags')

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
      // console.log('handle products search')
      return { ...state, productsSearch: action.payload }
    },
    handleProductsSort(state, action) {
      // console.log('handling products sort')
      return { ...state, productsSort: action.payload }
    },
    setMenuOpen(state, action) {
      // console.log('setting menu open')
      return { ...state, menuOpen: action.payload }
    },
    toggleMenuOpen(state) {
      // console.log('toggling menu open')
      const { menuOpen } = state
      return { ...state, menuOpen: !menuOpen }
    },
    toggleMobileMenuOpen(state) {
      // console.log('toggling mobile menu open')
      const { mobileMenuOpen } = state
      return { ...state, mobileMenuOpen: !mobileMenuOpen }
    },
    setMissingImage(state, action) {
      if (state.missingImage) return state
      // console.log('setting missing image')

      return {
        ...state,
        missingImage: action.payload,
      }
    },
    // setIsLoading(state, action) {
    //   return { ...state, isLoading: action.payload }
    // },
  },
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload.products,
  //     }
  //   },
  // },
})

export const {
  setAllTags,
  setProducts,
  handleTags,
  resetTags,
  handleProducts,
  handlePage,
  handleProductsSearch,
  handleProductsSort,
  toggleMenuOpen,
  toggleMobileMenuOpen,
  setMenuOpen,
  setMissingImage,
  // setIsLoading,
} = productsSlice.actions

export const selectProducts = () => (state: AppState) =>
  state?.[productsSlice.name]

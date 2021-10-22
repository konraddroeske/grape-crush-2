import { createSlice } from '@reduxjs/toolkit'
import chunk from 'lodash.chunk'
import deburr from 'lodash.deburr'
import { HYDRATE } from 'next-redux-wrapper'

import { sortProducts } from '@lib/sortProducts'
import { ProductCategories, ProductLowercase } from '@models/ambassador'
import { Asset, ICategoryFields } from '@models/contentful-graph'
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
  categories: ICategoryFields[]
  products: ProductLowercase[]
  allTags: TagsByCount | null
  topStyles: string[]
  // productsByTag: ProductsByTag | null
  // selectedProducts: ProductLowercase[] | null
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
  isLoading: boolean
}

const initialState: ProductsSlice = {
  categories: [],
  products: [],
  allTags: null,
  topStyles: [],
  // productsByTag: null,
  // selectedProducts: [],
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
  isLoading: true,
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategories(state, action) {
      const { items } = action.payload

      const { parentType, category, type } = { ...state.allTags }
      const merged = { ...parentType, ...category, ...type }

      const categoriesWithCount = items.map((item: ICategoryFields) => {
        const count = merged[item.categoryName.toLowerCase()]
        return { ...item, count: count || 0 }
      })

      const sortedCategories = categoriesWithCount.sort(
        (a: ICategoryFields, b: ICategoryFields) => {
          return b.count - a.count
        }
      )

      return { ...state, categories: sortedCategories }
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

      const selectedTagsCategories = Object.entries(selectedTagsObj)
        .filter(([_, value]) => value.length > 0)
        .map(([key, _]) => key)

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

      const sortedProducts = sortProducts([...searchedProducts], productsSort)
      const selectedProductsByPage = chunk(
        sortedProducts,
        state.productsPerPage
      )

      const maxPage = selectedProductsByPage.length

      if (state.page !== 1 && state.page >= maxPage) {
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
      return { ...state, productsSearch: action.payload }
    },
    handleProductsSort(state, action) {
      return { ...state, productsSort: action.payload }
    },
    setMenuOpen(state, action) {
      return { ...state, menuOpen: action.payload }
    },
    toggleMenuOpen(state) {
      const { menuOpen } = state
      return { ...state, menuOpen: !menuOpen }
    },
    toggleMobileMenuOpen(state) {
      const { mobileMenuOpen } = state
      return { ...state, mobileMenuOpen: !mobileMenuOpen }
    },
    setMissingImage(state, action) {
      const { items } = action.payload
      const lightImage = items.find((image: Asset) =>
        image.title.toLowerCase().includes('light')
      )
      return {
        ...state,
        missingImage: lightImage,
      }
    },
    setTopStyles(state, action) {
      return { ...state, topStyles: action.payload }
    },
    // setIsLoading(state, action) {
    //   return { ...state, isLoading: action.payload }
    // },
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
  toggleMenuOpen,
  toggleMobileMenuOpen,
  setMenuOpen,
  setMissingImage,
  setTopStyles,
  // setIsLoading,
} = productsSlice.actions

export const selectProducts = () => (state: AppState) =>
  state?.[productsSlice.name]

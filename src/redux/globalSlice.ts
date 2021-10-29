import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { ProductLowercase } from '@models/ambassador'
import {
  Asset,
  CONTENTFUL_DEFAULT_LOCALE_CODE,
  ICategoryFields,
  IFooterFields,
  IHeroSlideFields,
  INavFields,
  IPageFields,
  LOCALE_CODE,
} from '@models/contentful-graph'
import type { AppState } from '@redux/store'

interface Theme {
  nav: string
  title: string
  buttonBorder: string
  buttonText: string
  background: string
  duration: number
  arrows: string
}

interface Global {
  locale: CONTENTFUL_DEFAULT_LOCALE_CODE
  locales: LOCALE_CODE[]
  allPages: IPageFields[]
  legalPages: IPageFields[]
  footer: IFooterFields[]
  nav: INavFields[]
  navOpen: boolean
  mobileNavOpen: boolean
  isSticky: boolean
  heroSlides: IHeroSlideFields[]
  seoImage: Asset | null
  currentTheme: Theme
  topStyles: string[]
  categories: ICategoryFields[]
  pageProductData: ProductLowercase | null
}

const initialState: Global = {
  locale: 'en-US',
  locales: ['en-US'],
  allPages: [],
  legalPages: [],
  navOpen: false,
  mobileNavOpen: false,
  isSticky: false,
  footer: [],
  nav: [],
  heroSlides: [],
  seoImage: null,
  currentTheme: {
    nav: '#2C148E',
    title: '#d9ff6c',
    buttonBorder: '#d9ff6c',
    buttonText: 'white',
    background: '#c297ef',
    duration: 0.7,
    arrows: '#d9ff6c',
  },
  topStyles: [],
  categories: [],
  pageProductData: null,
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLocale(state, action) {
      return { ...state, locale: action.payload }
    },
    setPages(state, action) {
      const { items } = action.payload

      const legalPages = items.filter(
        (page: IPageFields) => page.category === 'Legal Stuff'
      )

      return { ...state, allPages: items, legalPages }
    },
    setNavOpen(state, action) {
      return { ...state, navOpen: action.payload }
    },
    setFooter(state, action) {
      const { items } = action.payload
      return { ...state, footer: items }
    },
    setNav(state, action) {
      const { items } = action.payload
      return { ...state, nav: items }
    },
    setHeroSlides(state, action) {
      const { items } = action.payload

      const seoSlide = items.find((item: IHeroSlideFields) => item.mainImage)
      const { image: seoImage } = seoSlide

      return { ...state, seoImage, heroSlides: items }
    },
    setMobileNavOpen(state, action) {
      return { ...state, mobileNavOpen: action.payload }
    },
    setIsSticky(state, action) {
      return { ...state, isSticky: action.payload }
    },
    setTopStyles(state, action) {
      return { ...state, topStyles: action.payload }
    },
    setCategories(state, action) {
      return { ...state, categories: action.payload }
    },
    setPageProductData(state, action) {
      return { ...state, pageProductData: action.payload }
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      // console.log('global slice', state)
      return {
        ...state,
        ...action.payload.global,
      }
    },
  },
})

export const {
  setLocale,
  setPages,
  setNavOpen,
  setFooter,
  setNav,
  setHeroSlides,
  setMobileNavOpen,
  setIsSticky,
  setTopStyles,
  setCategories,
  setPageProductData,
} = globalSlice.actions

export const selectGlobal = () => (state: AppState) => state?.[globalSlice.name]

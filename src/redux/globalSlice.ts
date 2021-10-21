import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import {
  Asset,
  CONTENTFUL_DEFAULT_LOCALE_CODE,
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
  // helpPages: CmsAssets[]
  legalPages: IPageFields[]
  footer: IFooterFields[]
  nav: INavFields[]
  navOpen: boolean
  mobileNavOpen: boolean
  heroSlides: IHeroSlideFields[]
  // seoImage: CmsImage | null
  seoImage: Asset | null
  currentTheme: Theme
}

const initialState: Global = {
  locale: 'en-US',
  locales: ['en-US'],
  allPages: [],
  // helpPages: [],
  legalPages: [],
  navOpen: false,
  mobileNavOpen: false,
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

      // const helpPages = action.payload.filter(
      //   (page: CmsAssets) => page.category[state.locale] === 'Help'
      // )

      // console.log('help pages', helpPages)

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
} = globalSlice.actions

export const selectGlobal = () => (state: AppState) => state?.[globalSlice.name]

import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import {
  CmsImage,
  CONTENTFUL_DEFAULT_LOCALE_CODE,
  IFooterFields,
  IHeroSlideFields,
  INavFields,
  IPageFields,
  LOCALE_CODE,
} from '@models/contentful'
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
  heroSlides: IHeroSlideFields[]
  seoImage: CmsImage | null
  currentTheme: Theme
}

const initialState: Global = {
  locale: 'en-US',
  locales: ['en-US'],
  allPages: [],
  // helpPages: [],
  legalPages: [],
  navOpen: false,
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
      const legalPages = action.payload.filter(
        (page: IPageFields) => page.category[state.locale] === 'Legal Stuff'
      )

      // const helpPages = action.payload.filter(
      //   (page: CmsAssets) => page.category[state.locale] === 'Help'
      // )

      // console.log('help pages', helpPages)

      return { ...state, allPages: action.payload, legalPages }
    },
    setNavOpen(state, action) {
      return { ...state, navOpen: action.payload }
    },
    setFooter(state, action) {
      return { ...state, footer: action.payload }
    },
    setNav(state, action) {
      return { ...state, nav: action.payload }
    },
    setHeroSlides(state, action) {
      const [firstSlide] = action.payload
      const { image } = firstSlide

      return { ...state, seoImage: image, heroSlides: action.payload }
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
} = globalSlice.actions

export const selectGlobal = () => (state: AppState) => state?.[globalSlice.name]

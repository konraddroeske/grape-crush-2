import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { CmsAssets, Locales } from '@lib/cms'
import type { AppState } from '@redux/store'

interface Global {
  locale: Locales
  locales: Locales[]
  allPages: CmsAssets[]
  // helpPages: CmsAssets[]
  legalPages: CmsAssets[]
  footer: CmsAssets[]
  nav: CmsAssets[]
  navOpen: boolean
  // allEntries: CmsAssets[]
  // allAssets: CmsAssets[]
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
  // allEntries: [],
  // allAssets: [],
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
        (page: CmsAssets) => page.category[state.locale] === 'Legal Stuff'
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
    // setAllEntries(state, action) {
    //   return { ...state, allEntries: action.payload }
    // },
    // setAllAssets(state, action) {
    //   return { ...state, allAssets: action.payload }
    // },
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
  // setTest,
  // setAllEntries,
  // setAllAssets,
} = globalSlice.actions

export const selectGlobal = () => (state: AppState) => state?.[globalSlice.name]

import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { CmsAssets } from '@lib/cms'
import type { AppState } from '@redux/store'

interface Global {
  locale: string
  locales: string[]
  helpPages: CmsAssets[]
  legalPages: CmsAssets[]
  footer: CmsAssets[]
  nav: CmsAssets[]
  navOpen: boolean
}

const initialState: Global = {
  locale: 'en-US',
  locales: ['en-US'],
  helpPages: [],
  legalPages: [],
  navOpen: false,
  footer: [],
  nav: [],
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

      const helpPages = action.payload.filter(
        (page: CmsAssets) => page.category[state.locale] === 'Help'
      )

      return { ...state, legalPages, helpPages }
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
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.global,
      }
    },
  },
})

export const { setLocale, setPages, setNavOpen, setFooter, setNav } =
  globalSlice.actions

export const selectGlobal = () => (state: AppState) => state?.[globalSlice.name]

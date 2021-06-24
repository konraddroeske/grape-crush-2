import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { CmsAssets } from '@lib/cms'
import type { AppState } from '@redux/store'

interface Global {
  locale: string
  locales: string[]
  helpPages: CmsAssets[]
  legalPages: CmsAssets[]
}

const initialState: Global = {
  locale: 'en-US',
  locales: ['en-US'],
  helpPages: [],
  legalPages: [],
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

export const { setLocale, setPages } = globalSlice.actions

export const selectGlobal = () => (state: AppState) => state?.[globalSlice.name]

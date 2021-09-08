import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { CmsAssets } from '@lib/cms'
import type { AppState } from '@redux/store'

// export const handleHeroSlides = (heroSlides: HeroSlides[]): AppThunk => {
//   return async (dispatch) => {
//     dispatch(
//       heroSlice.actions.setHeroSlides({
//         heroSlides,
//       })
//     )
//   }
// }
interface Theme {
  nav: string
  title: string
  buttonBorder: string
  buttonText: string
  background: string
  duration: number
  arrows: string
}

interface HeroSlice {
  heroSlides: CmsAssets[]
  themes: Theme[]
  currentTheme: Theme
}

const initialState = {
  heroSlides: [],
  themes: [
    {
      nav: '#414042',
      title: '#d9ff6c',
      buttonBorder: '#d9ff6c',
      buttonText: 'white',
      background: '#c297ef',
      duration: 0.7,
      arrows: '#d9ff6c',
    },
    {
      nav: 'white',
      title: '#FF8657',
      buttonBorder: '#FF8657',
      buttonText: 'white',
      background: '#4348e3',
      duration: 0.7,
      arrows: '#d9ff6c',
    },
    {
      nav: '#414042',
      title: 'white',
      buttonBorder: '#d9ff6c',
      buttonText: 'white',
      background: '#FF8657',
      duration: 0.7,
      arrows: 'white',
    },
    {
      nav: '#414042',
      title: '#FF8657',
      buttonBorder: '#FF8657',
      buttonText: '#414042',
      background: '#f1f2f2',
      duration: 0.7,
      arrows: '#414042',
    },
  ],
  currentTheme: {
    nav: '#2C148E',
    title: '#d9ff6c',
    buttonBorder: '#d9ff6c',
    buttonText: 'white',
    background: '#c297ef',
    duration: 0.7,
    arrows: '#d9ff6c',
  },
} as HeroSlice

export const heroSlice = createSlice({
  name: 'hero',
  initialState,
  reducers: {
    setHeroSlides(state, action) {
      return { ...state, heroSlides: action.payload }
    },
    setCurrentTheme(state, action) {
      const { themes } = state

      const currentTheme =
        action.payload <= themes.length - 1
          ? themes[action.payload]
          : themes[action.payload % (themes.length - 1)]

      return { ...state, currentTheme }
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.hero,
      }
    },
  },
})

export const { setHeroSlides, setCurrentTheme } = heroSlice.actions

export const selectHero = () => (state: AppState) => state?.[heroSlice.name]

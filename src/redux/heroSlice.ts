import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { HeroSlides } from '@models/hero'

// eslint-disable-next-line import/no-cycle
import { AppState } from '@redux/store'

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
}

interface HeroSlice {
  heroSlides: HeroSlides[]
  // currentSlide: number
  themes: Theme[]
  currentTheme: Theme
}

const initialState = {
  heroSlides: [],
  // currentSlide: 0,
  themes: [
    {
      nav: 'gray-dark',
      title: 'lime',
      buttonBorder: 'lime',
      buttonText: 'white',
      background: 'purple',
    },
    {
      nav: 'white',
      title: 'orange',
      buttonBorder: 'orange',
      buttonText: 'white',
      background: 'blue',
    },
    {
      nav: 'gray-dark',
      title: 'white',
      buttonBorder: 'lime',
      buttonText: 'white',
      background: 'orange',
    },
    {
      nav: 'gray-dark',
      title: 'orange',
      buttonBorder: 'orange',
      buttonText: 'gray-dark',
      background: 'gray-light',
    },
  ],
  currentTheme: {
    nav: 'gray-dark',
    title: 'lime',
    buttonBorder: 'lime',
    buttonText: 'white',
    background: 'purple',
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

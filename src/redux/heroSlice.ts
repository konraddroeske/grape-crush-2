import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"

import { HeroSlides } from "@models/hero"

// eslint-disable-next-line import/no-cycle
import { AppState } from "@redux/store"

// export const handleHeroSlides = (heroSlides: HeroSlides[]): AppThunk => {
//   return async (dispatch) => {
//     dispatch(
//       heroSlice.actions.setHeroSlides({
//         heroSlides,
//       })
//     )
//   }
// }

interface HeroSlice {
  heroSlides: HeroSlides[]
}

const initialState = {
  heroSlides: [],
} as HeroSlice

export const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    setHeroSlides(state, action) {
      const { heroSlides } = action.payload
      return { ...state, heroSlides }
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

export const { setHeroSlides } = heroSlice.actions

export const selectSubject = () => (state: AppState) => state?.[heroSlice.name]

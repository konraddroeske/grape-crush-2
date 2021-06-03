import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"

import { HeroSlides } from "@models/hero"

// eslint-disable-next-line import/no-cycle
import { AppState, AppThunk } from "@redux/store"

export const fetchSubject =
  (heroSlides: HeroSlides[]): AppThunk =>
  async (dispatch) => {
    // console.log("receiving hero slides", heroSlides)

    dispatch(
      subjectSlice.actions.setEnt({
        data: `Data from server side props.`,
        heroSlides,
      })
    )
  }

export const subjectSlice = createSlice({
  name: "subject",

  initialState: {
    heroSlides: [],
  },

  reducers: {
    setEnt(state, action) {
      return action.payload
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.subject,
      }
    },
  },
})

export const selectSubject = () => (state: AppState) =>
  state?.[subjectSlice.name]

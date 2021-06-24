import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { IgImage } from '@models/ambassador'
import type { AppState } from '@redux/store'

interface SocialSlice {
  igImages: IgImage[]
}

const initialState: SocialSlice = {
  igImages: [],
}

export const socialSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {
    setIgImages(state, action) {
      const [data] = action.payload
      const { media }: { media: IgImage[] } = data
      return { ...state, igImages: media }
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.social,
      }
    },
  },
})

export const { setIgImages } = socialSlice.actions

export const selectSocial = () => (state: AppState) => state?.[socialSlice.name]

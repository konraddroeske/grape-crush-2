import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { IFaqFields } from '@models/contentful'
import type { AppState } from '@redux/store'

interface Faq {
  questions: IFaqFields[]
}

const initialState: Faq = {
  questions: [],
}

export const faqSlice = createSlice({
  name: 'faq',
  initialState,
  reducers: {
    setQuestions(state, action) {
      return { ...state, questions: action.payload }
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.faq,
      }
    },
  },
})

export const { setQuestions } = faqSlice.actions

export const selectFaq = () => (state: AppState) => state?.[faqSlice.name]

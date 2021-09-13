import { createSlice } from '@reduxjs/toolkit'

import type { AppState } from '@redux/store'

interface Client {
  navSearch: string
}

const initialState: Client = {
  navSearch: '',
}

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setNavSearch(state, action) {
      return { ...state, navSearch: action.payload }
    },
  },
})

export const { setNavSearch } = clientSlice.actions

export const selectClient = () => (state: AppState) => state?.[clientSlice.name]

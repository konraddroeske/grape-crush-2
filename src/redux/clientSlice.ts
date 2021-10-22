import { createSlice } from '@reduxjs/toolkit'

import type { AppState } from '@redux/store'

interface Client {
  navSearch: string
  search: string
  modalOpen: boolean
  // isLoading: boolean
}

const initialState: Client = {
  navSearch: '',
  search: '',
  modalOpen: true,
  // isLoading: false,
}

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setNavSearch(state, action) {
      return { ...state, navSearch: action.payload }
    },
    closeModal(state) {
      return { ...state, modalOpen: false }
    },
    setSearch(state, action) {
      return { ...state, search: action.payload }
    },
    // setIsLoading(state, action) {
    //   return { ...state, isLoading: action.payload }
    // },
  },
})

export const { setNavSearch, closeModal, setSearch } = clientSlice.actions

export const selectClient = () => (state: AppState) => state?.[clientSlice.name]

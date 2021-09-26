import { PlaceDetailsResponseData } from '@googlemaps/google-maps-services-js/dist/places/details'
import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { IContactFields } from '@models/contentful-graph'
import type { AppState } from '@redux/store'

interface Contact {
  fields: IContactFields | null
  // location: GeocodeResponseData | null
  location: PlaceDetailsResponseData | null
}

const initialState: Contact = {
  fields: null,
  location: null,
}

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setContact(state, action) {
      const { items } = action.payload
      const [fields]: [IContactFields] = items
      return { ...state, fields }
    },
    setLocation(state, action) {
      return { ...state, location: action.payload }
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.contact,
      }
    },
  },
})

export const { setContact, setLocation } = contactSlice.actions

export const selectContact = () => (state: AppState) =>
  state?.[contactSlice.name]

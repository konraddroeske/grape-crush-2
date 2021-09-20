import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

import { IAboutFields, ITeamMembersFields } from '@models/contentful'
import type { AppState } from '@redux/store'

interface About {
  fields: IAboutFields | null
  teamMembers: ITeamMembersFields[]
}

const initialState: About = {
  fields: null,
  teamMembers: [],
}

export const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    setFields(state, action) {
      const [fields]: [IAboutFields] = action.payload
      return { ...state, fields }
    },
    setTeamMembers(state, action) {
      return { ...state, teamMembers: action.payload }
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.about,
      }
    },
  },
})

export const { setFields, setTeamMembers } = aboutSlice.actions

export const selectAbout = () => (state: AppState) => state?.[aboutSlice.name]

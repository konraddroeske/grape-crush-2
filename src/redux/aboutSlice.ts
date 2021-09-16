import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

// import { AboutAssets } from '@lib/cms'
import { IAboutFields, ITeamMembersFields } from '@models/contentful'
import type { AppState } from '@redux/store'

interface About {
  // fields: AboutAssets | undefined
  fields: IAboutFields | undefined
  teamMembers: ITeamMembersFields[]
}

const initialState: About = {
  fields: undefined,
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

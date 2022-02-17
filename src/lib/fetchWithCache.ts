import { QueryOptions } from '@apollo/client'
import {
  Client,
  PlaceDetailsRequest,
} from '@googlemaps/google-maps-services-js'
import axios from 'axios'
import { DocumentNode } from 'graphql'
import cacheData from 'memory-cache'

import client from '@lib/apolloClient'

// eslint-disable-next-line import/prefer-default-export
export const fetchWithCacheAxios = async <T>(url: string) => {
  console.log('url', url)
  const value = cacheData.get(url)

  if (value) {
    return value
  }

  console.log('fetching without cache')

  const hours = 1
  const data = await axios.get<T>(url)
  cacheData.put(url, data, hours * 1000 * 60 * 60)

  return data
}

export const fetchWithCacheGoogle = async (request: PlaceDetailsRequest) => {
  const requestKey = JSON.stringify(request)
  const value = cacheData.get(requestKey)

  if (value) {
    return value
  }

  const googleClient = new Client({})

  const hours = 1
  const { data: locationData } = await googleClient.placeDetails(request)

  cacheData.put(requestKey, locationData, hours * 1000 * 60 * 60)

  return locationData
}

const getGqlString = (doc: DocumentNode) => {
  return doc.loc && doc.loc.source.body
}

export const fetchWithCacheApollo = async <T>(options: QueryOptions) => {
  const { query, variables } = options
  const gqlString = getGqlString(query) + JSON.stringify(variables)
  const value = cacheData.get(gqlString)

  if (value) {
    return value
  }

  const hours = 1
  const { data } = await client.query<T>(options)

  cacheData.put(gqlString, data, hours * 1000 * 60 * 60)

  return data
}

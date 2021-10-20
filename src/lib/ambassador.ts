import axios, { AxiosResponse } from 'axios'

import cacheData from 'memory-cache'

const fetchWithCache = async <T>(url: string) => {
  const value = cacheData.get(url)

  if (value) {
    console.log('fetching from cache')
    return value
  }

  console.log('fetching from api')
  const hours = 24
  const data = await axios.get<T>(url)
  cacheData.put(url, data, hours * 1000 * 60 * 60)

  return data
}

axios.defaults.baseURL = 'https://dashboard.ambassador.ai/data/v1/'
axios.defaults.headers.common.Authorization = process.env.BEARER_TOKEN

const responseBody = <T>(response: AxiosResponse<T>) => response.data

const requests = {
  get: <T>(url: string) =>
    fetchWithCache<T>(url).then((res) => responseBody<T>(res)),
}

const api = {
  allShops: <T>() => requests.get<T>(`/shops`),
}

const ambassador = {
  api,
}

export default ambassador

import axios, { AxiosResponse } from 'axios'

import { fetchWithCacheAxios } from '@lib/fetchWithCache'

axios.defaults.baseURL = 'https://dashboard.ambassador.ai/data/v1/'
axios.defaults.headers.common.Authorization = process.env.BEARER_TOKEN

const responseBody = <T>(response: AxiosResponse<T>) => response.data

const requests = {
  get: <T>(url: string) =>
    fetchWithCacheAxios<T>(url).then((res) => responseBody<T>(res)),
  getWithoutCache: <T>(url: string) =>
    axios.get<T>(url).then((res) => responseBody<T>(res)),
}

const api = {
  allShops: <T>() => requests.get<T>(`/shops`),
  allShopsWithoutCache: <T>() => requests.getWithoutCache<T>(`/shops`),
}

const ambassador = {
  api,
}

export default ambassador

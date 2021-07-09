import axios, { AxiosResponse } from 'axios'

import { AmbassadorIg, AmbassadorShops } from '@models/ambassador'
// import { Activity } from '../models/activity'

axios.defaults.baseURL = 'https://dashboard.ambassador.ai/data/v1/'
// axios.defaults.baseURL = 'https://dash-staging.ambassador.ai/data/v1/'
axios.defaults.headers.common.Authorization = process.env.BEARER_TOKEN

const responseBody = <T>(response: AxiosResponse<T>) => response.data

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  // post: <T>(url: string, body: {}) =>
  //   axios.post<T>(url, body).then(responseBody),
  // put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  // del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const api = {
  allShops: () => requests.get<any>(`/shops`),
  filterByKey: (key: string, type: string) =>
    requests.get<AmbassadorShops>(`/shops?data.${key}=${type}`),
  getSocial: () => requests.get<AmbassadorIg>('/instagram'),
  // details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  // create: (activity: Activity) => axios.post<void>('/activities', activity),
  // update: (activity: Activity) =>
  //   axios.put<void>(`/activities/${activity.id}`, activity),
  // delete: (id: string) => axios.delete<void>(`/activities/${id}`),
}

const ambassador = {
  api,
}

export default ambassador

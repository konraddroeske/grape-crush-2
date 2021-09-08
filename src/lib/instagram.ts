import axios from 'axios'

// eslint-disable-next-line import/prefer-default-export
export const getImages = async () => {
  return axios.get(
    'https://www.instagram.com/graphql/query/?query_hash=ea4baf885b60cbf664b34ee760397549&variables=%7B%22id%22%3A%2223120198781%22%2C%22first%22%3A12%2C%22after%22%3A%22QVFDWHA1b25yQnBydnJhLXBxbTZCY1E3allLdkRTbWUwUGF0YUpnRy0wNkRrR0k2Vjd3WE5hNnBMTm1pTk9oS3VqRWo2WGJsSVdpTTVtQWlXOWhRdG9DRA%3D%3D%22%7D'
  )
}

import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.CF_SPACE_ID}`,
  credentials: 'same-origin',
  headers: {
    Authorization: `Bearer ${process.env.CF_PREVIEW_ACCESS_TOKEN}`,
  },
})

export default client

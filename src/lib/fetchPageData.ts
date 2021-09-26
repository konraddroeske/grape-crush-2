import client from '@lib/apolloClient'
import { pageQuery } from '@models/schema'

export default async function fetchPageData() {
  const { data: pageData } = await client.query({
    query: pageQuery,
  })

  const { pageCollection } = pageData

  return {
    pageCollection,
  }
}

import apolloClient from '@lib/apolloClient'
import { indexQuery } from '@models/schema'

export default async function fetchIndexData() {
  const { data: indexData } = await apolloClient.query({
    query: indexQuery,
  })
  const { infoBox1Collection } = indexData

  // console.log('info box', infoBox1Collection)

  return {
    // newArrivals: productsWithNewKeys,
    infoBox1Collection,
  }
}

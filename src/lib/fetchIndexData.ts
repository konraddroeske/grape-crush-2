import client from '@lib/apolloClient'
import { assetCollectionQuery, indexQuery } from '@models/schema'

export default async function fetchIndexData() {
  const { data: indexData } = await client.query({
    query: indexQuery,
  })

  const { infoBox1Collection } = indexData

  const { data: houseWineImageData } = await client.query({
    query: assetCollectionQuery,
    variables: {
      assetCollectionWhere: {
        title_contains: 'house-wine-transparent',
      },
    },
  })

  const { assetCollection: houseWineCollection } = houseWineImageData

  return {
    infoBox1Collection,
    houseWineCollection,
  }
}

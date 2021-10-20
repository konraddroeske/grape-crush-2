import { fetchWithCacheApollo } from '@lib/fetchWithCache'
import { assetCollectionQuery, indexQuery } from '@models/schema'

export default async function fetchIndexData() {
  const indexData = await fetchWithCacheApollo({
    query: indexQuery,
  })

  const { infoBox1Collection } = indexData

  const houseWineImageData = await fetchWithCacheApollo({
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

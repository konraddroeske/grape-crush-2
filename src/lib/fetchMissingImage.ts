import { fetchWithCacheApollo } from '@lib/fetchWithCache'
import { Asset } from '@models/contentful-graph'
import { assetCollectionQuery } from '@models/schema'

export default async function fetchMissingImage() {
  const missingImageData = await fetchWithCacheApollo({
    query: assetCollectionQuery,
    variables: {
      assetCollectionWhere: {
        title_contains: 'missing',
      },
    },
  })

  const { assetCollection } = missingImageData
  const { items } = assetCollection

  return items.find((image: Asset) =>
    image.title.toLowerCase().includes('light')
  )
}

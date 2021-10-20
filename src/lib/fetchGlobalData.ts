import { addPriceRange } from '@lib/addPriceRange'

import ambassador from '@lib/ambassador'
import { cleanData } from '@lib/cleanData'
import { fetchWithCacheApollo } from '@lib/fetchWithCache'
import { AmbassadorShops } from '@models/ambassador'
import { globalQuery } from '@models/schema'

export default async function fetchGlobalData() {
  const locale = 'en-US'

  const graphData = await fetchWithCacheApollo({
    query: globalQuery,
  })

  const data = await ambassador.api.allShops<AmbassadorShops>()
  const { data: allShops } = data

  const { shops } = allShops
  const [shop] = shops
  const { products } = shop

  const productsWithPriceRange = addPriceRange(products)
  const productsWithNewKeys = cleanData(productsWithPriceRange)

  return {
    ...graphData,
    locale,
    products: productsWithNewKeys,
  }
}

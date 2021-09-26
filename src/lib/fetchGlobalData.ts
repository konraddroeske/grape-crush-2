import { addPriceRange } from '@lib/addPriceRange'
import ambassador from '@lib/ambassador'
import client from '@lib/apolloClient'
import { cleanData } from '@lib/cleanData'
import { globalQuery } from '@models/schema'

export default async function fetchGlobalData() {
  const locale = 'en-US'

  const { data: graphData } = await client.query({
    query: globalQuery,
  })

  const { data: allShops } = await ambassador.api.allShops()

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

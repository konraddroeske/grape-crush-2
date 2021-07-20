import { addPriceRange } from '@lib/addPriceRange'
import ambassador from '@lib/ambassador'
import { getAssets, getEntries } from '@lib/cms'
import { renameKeys } from '@lib/renameKeys'
import { AmbassadorIg } from '@models/ambassador'

export default async function fetchGlobalData() {
  const locale = 'en-US'
  const contentIds = ['category', 'page']

  const groupedEntries = await Promise.all(
    contentIds.map((id) => getEntries(id))
  )

  const [categoryAssets, pageAssets] = await Promise.all(
    groupedEntries.map((entries) => getAssets(entries, locale))
  )

  const { data: igImages }: AmbassadorIg = await ambassador.api.getSocial()

  const { data: allShops } = await ambassador.api.allShops()

  const { shops } = allShops
  const [shop] = shops
  const { categories, products } = shop

  const productsWithPriceRange = addPriceRange(products)
  const productsWithNewKeys = renameKeys(productsWithPriceRange)

  return {
    locale,
    pageAssets,
    categoryAssets,
    categories,
    igImages,
    products: productsWithNewKeys,
  }
}

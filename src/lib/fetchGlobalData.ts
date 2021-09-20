import { addPriceRange } from '@lib/addPriceRange'
import ambassador from '@lib/ambassador'
import { cleanData } from '@lib/cleanData'
import { getAssets, getEntries } from '@lib/cms'

export default async function fetchGlobalData() {
  const locale = 'en-US'
  const contentIds = ['category', 'page', 'footer', 'nav']

  const groupedEntries = await Promise.all(
    contentIds.map((id) => getEntries(id))
  )

  const [categoryAssets, pageAssets, footerAssets, navAssets] =
    await Promise.all(
      groupedEntries.map((entries) => getAssets(entries, locale))
    )

  const { data: allShops } = await ambassador.api.allShops()

  const { shops } = allShops
  const [shop] = shops
  const { products } = shop

  const productsWithPriceRange = addPriceRange(products)
  const productsWithNewKeys = cleanData(productsWithPriceRange)

  return {
    locale,
    pageAssets,
    categoryAssets,
    footerAssets,
    navAssets,
    products: productsWithNewKeys,
  }
}

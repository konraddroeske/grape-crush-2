import ambassador from '@lib/ambassador'
import { getAssets, getEntries } from '@lib/cms'
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
  const { categories } = shop

  return {
    allShops,
    locale,
    pageAssets,
    categoryAssets,
    categories,
    igImages,
  }
}

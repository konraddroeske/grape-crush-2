import ambassador from '@lib/ambassador'
import { getAssets, getEntries } from '@lib/cms'
import { AmbassadorShops } from '@models/ambassador'

export default async function fetchIndexData() {
  const locale = 'en-US'
  const contentIds = ['heroSlide', 'infoBox1']

  // Contentful
  const groupedEntries = await Promise.all(
    contentIds.map((id) => getEntries(id))
  )

  const [heroAssets, infoBoxAssets] = await Promise.all(
    groupedEntries.map((entries) => getAssets(entries, locale))
  )

  // Ambassador
  const { data: newArrivals }: AmbassadorShops =
    await ambassador.api.filterByKey('Type', 'new!')

  const { shops } = newArrivals
  const [shop] = shops

  return {
    heroAssets,
    shop,
    infoBoxAssets,
  }
}

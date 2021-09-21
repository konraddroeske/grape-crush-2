import { getAssets, getEntries } from '@lib/cms'

export default async function fetchPageData() {
  const locale = 'en-US'
  const contentIds = ['page']

  // Contentful
  const groupedEntries = await Promise.all(
    contentIds.map((id) => getEntries(id))
  )

  const [pageAssets] = await Promise.all(
    groupedEntries.map((entries) => getAssets(entries, locale))
  )

  return {
    locale,
    pageAssets,
  }
}

import { getAssets, getEntries } from '@lib/cms'

export default async function fetchIndexData() {
  const locale = 'en-US'
  const contentIds = ['faq']

  // Contentful
  const groupedEntries = await Promise.all(
    contentIds.map((id) => getEntries(id))
  )

  const [faqAssets] = await Promise.all(
    groupedEntries.map((entries) => getAssets(entries, locale))
  )

  return {
    faqAssets,
  }
}

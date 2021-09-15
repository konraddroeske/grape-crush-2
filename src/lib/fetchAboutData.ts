import { getAssets, getEntries } from '@lib/cms'

export default async function fetchAboutData() {
  const locale = 'en-US'
  const contentIds = ['about', 'teamMembers']

  // Contentful
  const groupedEntries = await Promise.all(
    contentIds.map((id) => getEntries(id))
  )

  const [aboutAssets, teamMemberAssets] = await Promise.all(
    groupedEntries.map((entries) => getAssets(entries, locale))
  )

  return {
    aboutAssets,
    teamMemberAssets,
  }
}

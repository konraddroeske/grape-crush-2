import apolloClient from '@lib/apolloClient'
import { aboutQuery } from '@models/schema'

export default async function fetchAboutData() {
  const { data: aboutData } = await apolloClient.query({
    query: aboutQuery,
  })
  const { aboutCollection, teamMembersCollection } = aboutData

  return {
    aboutCollection,
    teamMembersCollection,
  }
}

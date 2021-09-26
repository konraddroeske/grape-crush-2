import apolloClient from '@lib/apolloClient'
import { faqQuery } from '@models/schema'

export default async function fetchFaqData() {
  const { data: faqData } = await apolloClient.query({
    query: faqQuery,
  })
  const { faqCollection } = faqData

  return {
    faqCollection,
  }
}

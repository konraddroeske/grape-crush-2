import { Client } from '@googlemaps/google-maps-services-js'

import apolloClient from '@lib/apolloClient'
import { contactQuery } from '@models/schema'

export default async function fetchAboutData() {
  const { data: contactData } = await apolloClient.query({
    query: contactQuery,
  })
  const { contactCollection } = contactData

  // Google Maps
  const googleClient = new Client({})

  const { data: locationData } = await googleClient.placeDetails({
    params: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      place_id: process.env.NEXT_PUBLIC_PLACE_ID!,
      fields: ['name', 'formatted_address', 'place_id', 'geometry'],
    },
    timeout: 1000,
  })

  return {
    contactCollection,
    locationData,
  }
}

import { Client } from '@googlemaps/google-maps-services-js'

import { getAssets, getEntries } from '@lib/cms'

export default async function fetchAboutData() {
  const locale = 'en-US'
  const contentIds = ['contact']

  // Contentful
  const groupedEntries = await Promise.all(
    contentIds.map((id) => getEntries(id))
  )

  const [contactAssets] = await Promise.all(
    groupedEntries.map((entries) => getAssets(entries, locale))
  )

  // Google Maps
  const client = new Client({})

  const { data: locationData } = await client.placeDetails({
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
    contactAssets,
    locationData,
  }
}

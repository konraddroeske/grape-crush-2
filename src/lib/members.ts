import fs from 'fs'
import path from 'path'

import ambassador from '@lib/ambassador'
import { getAssets, getEntries } from '@lib/cms'
import { AmbassadorIg, AmbassadorShops } from '@models/ambassador'

const fetchMembersData = async () => {
  // console.log('Fetching members data...')
  const locale = 'en-US'
  const contentIds = ['heroSlide', 'category', 'infoBox1', 'page']

  const groupedEntries = await Promise.all(
    contentIds.map((id) => getEntries(id))
  )

  const [heroAssets, categoryAssets, infoBoxAssets, pageAssets] =
    await Promise.all(
      groupedEntries.map((entries) => getAssets(entries, locale))
    )

  const { data: igImages }: AmbassadorIg = await ambassador.api.getSocial()
  const { data: newArrivals }: AmbassadorShops =
    await ambassador.api.filterByKey('Type', 'new!')

  const { shops } = newArrivals
  const [shop] = shops
  const { categories } = shop

  const { data: allShops } = await ambassador.api.allShops()

  return {
    allShops,
    locale,
    pageAssets,
    heroAssets,
    shop,
    categories: { categories, categoryAssets, locale },
    infoBoxAssets,
    igImages,
  }
  // return [{ email: 'test1@email.com' }, { email: 'test12@email.com' }]
}

const MEMBERS_CACHE_PATH = path.resolve(__dirname, '.members')

export default async function getMembers() {
  let cachedData

  try {
    cachedData = JSON.parse(
      fs.readFileSync(path.join(__dirname, MEMBERS_CACHE_PATH), 'utf8')
    )
  } catch (error) {
    // console.log('Member cache not initialized')
  }

  if (!cachedData) {
    const data = fetchMembersData()

    try {
      fs.writeFileSync(
        path.join(__dirname, MEMBERS_CACHE_PATH),
        JSON.stringify(data),
        'utf8'
      )
      // console.log('Wrote to members cache')
    } catch (error) {
      // console.log('ERROR WRITING MEMBERS CACHE TO FILE')
      // console.log(error)
    }

    cachedData = data
  }

  return cachedData
}

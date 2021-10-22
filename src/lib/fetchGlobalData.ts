import { EnhancedStore } from '@reduxjs/toolkit'

import { addPriceRange } from '@lib/addPriceRange'

import ambassador from '@lib/ambassador'
import { cleanData } from '@lib/cleanData'
import { fetchWithCacheApollo } from '@lib/fetchWithCache'
import { getAllTags, getTopStyles } from '@lib/handleTags'
import { AmbassadorShops } from '@models/ambassador'
import { globalQuery } from '@models/schema'
import {
  setFooter,
  setHeroSlides,
  setLocale,
  setNav,
  setPages,
} from '@redux/globalSlice'
import { setCategories, setTopStyles } from '@redux/productsSlice'

export default async function fetchGlobalData(store: EnhancedStore) {
  const locale = 'en-US'

  const {
    pageCollection,
    categoryCollection,
    footerCollection,
    navCollection,
    heroSlideCollection,
  } = await fetchWithCacheApollo({
    query: globalQuery,
  })

  const data = await ambassador.api.allShops<AmbassadorShops>()
  const { data: allShops } = data

  const { shops } = allShops
  const [shop] = shops
  const { products } = shop

  const productsWithPriceRange = addPriceRange(products)
  const productsWithNewKeys = cleanData(productsWithPriceRange)

  const allTags = getAllTags(productsWithNewKeys)
  const topStyles = getTopStyles(allTags)

  store.dispatch(setTopStyles(topStyles))
  store.dispatch(setLocale(locale))
  store.dispatch(setPages(pageCollection))
  store.dispatch(setCategories(categoryCollection))
  store.dispatch(setFooter(footerCollection))
  store.dispatch(setNav(navCollection))
  store.dispatch(setHeroSlides(heroSlideCollection))

  return {
    products: productsWithNewKeys,
    allTags,
  }
}

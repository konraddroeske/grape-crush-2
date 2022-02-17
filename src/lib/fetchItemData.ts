import { EnhancedStore } from '@reduxjs/toolkit'

import ambassador from '@lib/ambassador'
import { cleanData } from '@lib/cleanData'
import { fetchWithCacheApollo } from '@lib/fetchWithCache'
import { getAllTags, getCategories, getTopStyles } from '@lib/handleTags'
import { AmbassadorShops } from '@models/ambassador'
import { globalQuery } from '@models/schema'
import {
  setCategories,
  setFooter,
  setHeroSlides,
  setLocale,
  setNav,
  setPages,
  setTopStyles,
} from '@redux/globalSlice'

export default async function fetchItemData(
  store: EnhancedStore,
  name: string
) {
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

  const productsWithNewKeys = cleanData(products)

  const currentProduct = productsWithNewKeys.find(
    (product) => product.data.name === decodeURIComponent(name)
  )

  // if (!currentProduct) {
  //   const results = await handleMissingProduct(name)
  //   productsWithNewKeys = results.products
  //   currentProduct = results.product
  // }

  const allTags = getAllTags(productsWithNewKeys)
  const topStyles = getTopStyles(allTags)
  const categories = getCategories(categoryCollection.items, allTags)

  store.dispatch(setTopStyles(topStyles))
  store.dispatch(setLocale(locale))
  store.dispatch(setPages(pageCollection))
  store.dispatch(setCategories(categories))
  store.dispatch(setFooter(footerCollection))
  store.dispatch(setNav(navCollection))
  store.dispatch(setHeroSlides(heroSlideCollection))

  return {
    products: productsWithNewKeys,
    currentProduct,
  }
}

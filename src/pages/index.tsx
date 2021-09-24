import React, { FunctionComponent } from 'react'

import Seo from '@components/common/Seo'
import Description from '@components/landing-page/description/Description'
import FeaturesSlideshow from '@components/landing-page/features/FeaturesSlideshow'
import Hero from '@components/landing-page/hero/Hero'
import NewInfoBox1 from '@components/landing-page/info-boxes/info-box-1/NewInfoBox1'
import NewInfoBox3 from '@components/landing-page/info-boxes/info-box-3/NewInfoBox3'
import NewShopByType from '@components/landing-page/shop-by-type/ShopByType'
import fetchGlobalData from '@lib/fetchGlobalData'
import fetchIndexData from '@lib/fetchIndexData'
import {
  setFooter,
  setHeroSlides,
  setLocale,
  setNav,
  setPages,
} from '@redux/globalSlice'
import { setInfoBoxes, setNewArrivals } from '@redux/indexSlice'
import { setAllTags, setCategories } from '@redux/productsSlice'
import { wrapper } from '@redux/store'

const Home: FunctionComponent = () => {
  return (
    <>
      <Seo title="Wines Within Reach" />
      <main id="main" className="min-h-screen overflow-hidden">
        <Hero />
        <Description />
        <NewShopByType />
        <FeaturesSlideshow />
        <NewInfoBox3 />
        <NewInfoBox1 />
      </main>
    </>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const {
    products,
    locale,
    heroAssets,
    pageAssets,
    categoryAssets,
    footerAssets,
    navAssets,
  } = await fetchGlobalData()

  const { newArrivals, infoBoxAssets } = await fetchIndexData()

  // Global
  store.dispatch(setPages(pageAssets))
  store.dispatch(setCategories(categoryAssets))
  store.dispatch(setFooter(footerAssets))
  store.dispatch(setNav(navAssets))
  store.dispatch(setAllTags(products))
  store.dispatch(setLocale(locale))
  store.dispatch(setHeroSlides(heroAssets))

  // Index
  store.dispatch(setInfoBoxes(infoBoxAssets))
  store.dispatch(setNewArrivals(newArrivals))

  return {
    props: {},
    revalidate: 60,
  }
})

export default Home

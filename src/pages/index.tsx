import React, { FunctionComponent } from 'react'

import Seo from '@components/common/Seo'
import Description from '@components/landing-page/description/Description'
import FeaturesSlideshow from '@components/landing-page/features/FeaturesSlideshow'
import Hero from '@components/landing-page/hero/Hero'
import NewInfoBox1 from '@components/landing-page/info-boxes/info-box-1/NewInfoBox1'
import NewInfoBox3 from '@components/landing-page/info-boxes/info-box-3/NewInfoBox3'
import ShopByTypeGrid from '@components/landing-page/shop-by-type/ShopByTypeGrid'
import fetchGlobalData from '@lib/fetchGlobalData'
import fetchIndexData from '@lib/fetchIndexData'
import {
  setFooter,
  setHeroSlides,
  setLocale,
  setNav,
  setPages,
} from '@redux/globalSlice'
import { setInfoBoxes } from '@redux/indexSlice'
import { setAllTags, setCategories } from '@redux/productsSlice'
import { wrapper } from '@redux/store'

const Home: FunctionComponent = () => {
  return (
    <>
      <Seo title="Wines Within Reach" />
      <main id="main" className="min-h-screen overflow-hidden">
        <Hero />
        <Description />
        {/* <NewShopByType /> */}
        <ShopByTypeGrid />
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
    heroSlideCollection,
    pageCollection,
    footerCollection,
    navCollection,
    categoryCollection,
  } = await fetchGlobalData()

  const { infoBox1Collection } = await fetchIndexData()

  // Global
  store.dispatch(setAllTags(products))
  store.dispatch(setLocale(locale))
  store.dispatch(setPages(pageCollection))
  store.dispatch(setCategories(categoryCollection))
  store.dispatch(setFooter(footerCollection))
  store.dispatch(setNav(navCollection))
  store.dispatch(setHeroSlides(heroSlideCollection))

  // Index
  store.dispatch(setInfoBoxes(infoBox1Collection))

  return {
    props: {},
    revalidate: 60,
  }
})

export default Home

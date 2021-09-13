import React, { FunctionComponent } from 'react'

import Head from 'next/head'

import Description from '@components/landing-page/description/Description'
import FeaturesSlideshow from '@components/landing-page/features/FeaturesSlideshow'
import Hero from '@components/landing-page/hero/Hero'
import NewInfoBox1 from '@components/landing-page/info-boxes/info-box-1/NewInfoBox1'
import NewInfoBox3 from '@components/landing-page/info-boxes/info-box-3/NewInfoBox3'
import NewShopByType from '@components/landing-page/shop-by-type/ShopByType'
import fetchGlobalData from '@lib/fetchGlobalData'
import fetchIndexData from '@lib/fetchIndexData'
import { setFooter, setLocale, setNav, setPages } from '@redux/globalSlice'
import { setHeroSlides } from '@redux/heroSlice'
import { setInfoBoxes, setNewArrivals } from '@redux/indexSlice'
import { setAllTags, setCategories } from '@redux/productsSlice'
import { wrapper } from '@redux/store'

const Home: FunctionComponent = () => {
  return (
    <div>
      <Head>
        <title>Grape Crush</title>

        <meta
          name="description"
          content="Use tailwind css, eslint, prettier & absolute imports instantly.
            Easily extendable zero-config template for pros and beginners."
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main id="main" className="min-h-screen overflow-hidden">
        <Hero />
        <Description />
        <NewShopByType />
        <FeaturesSlideshow />
        <NewInfoBox3 />
        <NewInfoBox1 />
      </main>
    </div>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const {
    products,
    locale,
    pageAssets,
    categoryAssets,
    footerAssets,
    navAssets,
    // allEntries,
    // allAssets,
  } = await fetchGlobalData()

  const { heroAssets, newArrivals, infoBoxAssets } = await fetchIndexData()

  // store.dispatch(setAllEntries(allEntries))
  // store.dispatch(setAllAssets(allAssets))

  // Global
  store.dispatch(setPages(pageAssets))
  store.dispatch(setCategories(categoryAssets))
  store.dispatch(setFooter(footerAssets))
  store.dispatch(setNav(navAssets))

  store.dispatch(setAllTags(products))
  store.dispatch(setLocale(locale))

  // Index
  store.dispatch(setHeroSlides(heroAssets))
  store.dispatch(setInfoBoxes(infoBoxAssets))

  store.dispatch(setNewArrivals(newArrivals))

  return {
    props: {},
  }
})

export default Home

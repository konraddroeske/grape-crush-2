import React, { FunctionComponent } from 'react'

import Head from 'next/head'

import Description from '@components/landing-page/description/Description'
import FeaturesSlideshow from '@components/landing-page/features/FeaturesSlideshow'
import NewHero from '@components/landing-page/hero/NewHero'
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
  // const { newArrivals } = useSelector(selectIndex())

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
        <NewHero />
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
  // const { locale: defaultLocale = 'en-US' } = ctx

  const {
    products,
    locale,
    pageAssets,
    // igImages,
    categoryAssets,
    categories,
    footerAssets,
    navAssets,
  } = await fetchGlobalData()

  const { heroAssets, newArrivals, infoBoxAssets } = await fetchIndexData()

  // Global
  store.dispatch(setAllTags(products))
  store.dispatch(setLocale(locale))
  store.dispatch(setPages(pageAssets))
  store.dispatch(setCategories({ categories, categoryAssets, locale }))
  // store.dispatch(setIgImages(igImages))
  store.dispatch(setFooter(footerAssets))
  store.dispatch(setNav(navAssets))

  // Index
  store.dispatch(setHeroSlides(heroAssets))
  store.dispatch(setNewArrivals(newArrivals))
  store.dispatch(setInfoBoxes(infoBoxAssets))

  return {
    props: {},
  }
})

export default Home

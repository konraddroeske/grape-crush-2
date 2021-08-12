import React, { FunctionComponent } from 'react'

import Head from 'next/head'

import { useSelector } from 'react-redux'

import ProductsSlideshow from '@components/common/ProductsSlideshow'
import NewHero from '@components/landing-page/hero/NewHero'
import InfoBox1 from '@components/landing-page/info-boxes/info-box-1/InfoBox1'
import InfoBox2 from '@components/landing-page/info-boxes/info-box-2/InfoBox2'
import InfoBox3 from '@components/landing-page/info-boxes/info-box-3/InfoBox3'
import Mailer from '@components/landing-page/mailer/Mailer'
import ShopByType from '@components/landing-page/shop-by-type/ShopByType'
import SocialGallery from '@components/landing-page/social-gallery/SocialGallery'
import fetchGlobalData from '@lib/fetchGlobalData'
import fetchIndexData from '@lib/fetchIndexData'
import { setLocale, setPages } from '@redux/globalSlice'
import { setHeroSlides } from '@redux/heroSlice'
import { selectIndex, setInfoBoxes, setNewArrivals } from '@redux/indexSlice'
import { setAllTags, setCategories } from '@redux/productsSlice'
import { setIgImages } from '@redux/socialSlice'
import { wrapper } from '@redux/store'

const Home: FunctionComponent = () => {
  const { newArrivals } = useSelector(selectIndex())

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

      <main className="min-h-screen overflow-hidden">
        {/* <Hero /> */}
        <NewHero />
        {newArrivals && (
          <ProductsSlideshow products={newArrivals} headline="New Arrivals" />
        )}
        <ShopByType />
        <InfoBox1 />
        <InfoBox2 />
        <InfoBox3 />
        <Mailer />
        <SocialGallery />
      </main>
    </div>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  // const { locale: defaultLocale = 'en-US' } = ctx

  const { products, locale, pageAssets, igImages, categoryAssets, categories } =
    await fetchGlobalData()

  const { heroAssets, newArrivals, infoBoxAssets } = await fetchIndexData()

  // Global
  store.dispatch(setAllTags(products))
  store.dispatch(setLocale(locale))
  store.dispatch(setPages(pageAssets))
  store.dispatch(setCategories({ categories, categoryAssets, locale }))
  store.dispatch(setIgImages(igImages))

  // Index
  store.dispatch(setHeroSlides(heroAssets))
  store.dispatch(setNewArrivals(newArrivals))
  store.dispatch(setInfoBoxes(infoBoxAssets))

  return {
    props: {},
  }
})

export default Home

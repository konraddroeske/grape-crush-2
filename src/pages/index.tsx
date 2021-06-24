import React, { FunctionComponent } from 'react'

import Head from 'next/head'

import Hero from '@components/landing-page/hero/Hero'
import InfoBox1 from '@components/landing-page/info-box-1/InfoBox1'
import InfoBox2 from '@components/landing-page/info-box-2/InfoBox2'
import InfoBox3 from '@components/landing-page/info-box-3/InfoBox3'
import Mailer from '@components/landing-page/mailer/Mailer'
import NewArrivals from '@components/landing-page/new-arrivals/NewArrivals'
import ShopByType from '@components/landing-page/shop-by-type/ShopByType'
import SocialGallery from '@components/landing-page/social-gallery/SocialGallery'
import ambassador from '@lib/ambassador'
import { getAssets, getEntries } from '@lib/cms'
import { AmbassadorIg, AmbassadorShops } from '@models/ambassador'
import { setLocale, setPages } from '@redux/globalSlice'
import { setHeroSlides } from '@redux/heroSlice'
import {
  setCategories,
  setInfoBoxes,
  setNewArrivals,
} from '@redux/productsSlice'
import { setIgImages } from '@redux/socialSlice'
import { wrapper } from '@redux/store'

const Home: FunctionComponent = () => {
  // const { newArrivals } = useSelector(selectProducts())

  // console.log(newArrivals)

  // console.log(allShops)
  // if (!newArrivals) {
  //   return <div>No content in store.</div>
  // }

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

      <main className="min-h-screen">
        <Hero />
        <NewArrivals />
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

  store.dispatch(setLocale(locale))
  store.dispatch(setPages(pageAssets))
  store.dispatch(setHeroSlides(heroAssets))
  store.dispatch(setNewArrivals(shop))
  store.dispatch(setCategories({ categories, categoryAssets, locale }))
  store.dispatch(setInfoBoxes(infoBoxAssets))
  store.dispatch(setIgImages(igImages))

  return {
    props: {},
  }
})

export default Home

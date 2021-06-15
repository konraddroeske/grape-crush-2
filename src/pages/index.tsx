import React, { FunctionComponent } from 'react'

import Head from 'next/head'

import Hero from '@components/hero/Hero'
import NewArrivals from '@components/new-arrivals/NewArrivals'
import agent from '@lib/agent'
import { getHeroEntries, getImage } from '@lib/cms'
import { AmbassadorResponse } from '@models/ambassador'
import { HeroSlides } from '@models/hero'
import { setHeroSlides } from '@redux/heroSlice'
import { setNewArrivals } from '@redux/productsSlice'
import { wrapper } from '@redux/store'

interface OwnProps {
  heroSlides: HeroSlides[]
}

type Props = OwnProps

const Home: FunctionComponent<Props> = () => {
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
      </main>
    </div>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const locale = 'en-US'
  const { items } = await getHeroEntries()

  const heroSlides = await Promise.all(
    items.map(async (slide) => {
      const title = slide.fields.title[locale]
      const imageId = slide.fields.image[locale].sys.id
      const { fields } = await getImage(imageId)

      return {
        title,
        image: fields,
      }
    })
  )

  const { data: newArrivals }: AmbassadorResponse =
    await agent.ambassador.filterByKey('Type', 'new!')

  // console.log('ambassador response', newArrivals)

  store.dispatch(setHeroSlides(heroSlides))
  store.dispatch(setNewArrivals(newArrivals))

  return {
    props: {},
  }
})

export default Home

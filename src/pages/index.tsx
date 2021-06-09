import React, { FunctionComponent } from 'react'

import Head from 'next/head'
import { useSelector } from 'react-redux'

import Hero from '@components/hero/Hero'
import { getHeroEntries, getImage } from '@lib/cms'
import { HeroSlides } from '@models/hero'
import { selectHero, setHeroSlides } from '@redux/heroSlice'
import { wrapper } from '@redux/store'

interface OwnProps {
  heroSlides: HeroSlides[]
}

type Props = OwnProps

const Home: FunctionComponent<Props> = () => {
  const { heroSlides } = useSelector(selectHero())

  if (!heroSlides.length) {
    return <div>No content in store.</div>
  }

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
        {heroSlides && <Hero slides={heroSlides} />}
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

  await store.dispatch(setHeroSlides(heroSlides))

  return {
    props: {},
  }
})

export default Home

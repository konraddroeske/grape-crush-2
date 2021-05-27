import React, { FunctionComponent } from "react"

import Head from "next/head"

import Hero from "@components/hero/Hero"
import { HeroSlides } from "@models/hero"

import { getHeroEntries, getImage } from "../lib/cms"

interface OwnProps {
  heroSlides: HeroSlides[]
}

type Props = OwnProps

const Home: FunctionComponent<Props> = ({ heroSlides }) => {
  // console.log(heroSlides)
  return (
    <div>
      <Head>
        <title>Next.js advanced start template.</title>

        <meta
          name="description"
          content="Use tailwind css, eslint, prettier & absolute imports instantly.
            Easily extendable zero-config template for pros and beginners."
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <Hero slides={heroSlides} />
        <h3>Test Div</h3>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const locale = "en-US"
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

  return {
    props: { heroSlides },
  }
}

export default Home

import React, { FunctionComponent, useEffect, useState } from 'react'

import { NextSeo } from 'next-seo'
import { useSelector } from 'react-redux'

import { Asset } from '@models/contentful-graph'
import { selectGlobal } from '@redux/globalSlice'

interface OwnProps {
  title: string
  description?: string | undefined
  image?: Asset | undefined
}

type Props = OwnProps

const Seo: FunctionComponent<Props> = ({ title, description, image }) => {
  const { locale, seoImage: defaultImage } = useSelector(selectGlobal())
  const [imageData, setImageData] = useState<Asset | null>(null)

  useEffect(() => {
    if (defaultImage) {
      setImageData(defaultImage)
    }
  }, [image, defaultImage, locale])

  return (
    <NextSeo
      title={title}
      description={
        description ||
        "With one of Ontario's largest natural wines selection, shop from 200+ curated natural, biodynamic, and classic wines for any budget. We ship province-wide."
      }
      canonical="https://www.grapecrush.wine/"
      facebook={{
        appId: '1761199030730074',
      }}
      openGraph={
        imageData
          ? {
              images: [
                {
                  url: imageData.url,
                  width: imageData.width,
                  height: imageData.height,
                  alt: imageData.description,
                  type: 'image/jpeg',
                },
              ],
            }
          : {
              images: [
                {
                  url: 'https://images.ctfassets.net/q0vbuozzojij/5F3799qDHJZgjfhex2cWE7/8cd9ef8bf5ecfe3743d47403acdeaf7d/wine-rack.jpg',
                  width: 1260,
                  height: 874,
                  alt: 'Grape Crush Wine Rack',
                  type: 'image/jpeg',
                },
              ],
            }
      }
      twitter={{
        cardType: 'summary_large_image',
      }}
    />
  )
}

export default Seo

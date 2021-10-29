import React, { FunctionComponent } from 'react'

import { NextSeo } from 'next-seo'

import { Asset } from '@models/contentful-graph'

interface OwnProps {
  title?: string
  description?: string | undefined
  image?: Asset | undefined
  canonical?: string
}

type Props = OwnProps

const Seo: FunctionComponent<Props> = ({
  title,
  description,
  image,
  canonical,
}) => {
  return (
    <NextSeo
      title={title || 'Wines Within Reach'}
      canonical={canonical || 'https://www.grapecrush.wine/'}
      description={
        description ||
        "Ontario's largest selection of natural wines - shop from over 200+ curated natural, biodynamic, and classic wines for any budget."
      }
      openGraph={{
        url: canonical || 'https://www.grapecrush.wine/',
        title: title || 'Wines Within Reach',
        description:
          description ||
          "Ontario's largest selection of natural wines - shop from over 200+ curated natural, biodynamic, and classic wines for any budget.",
        images: image
          ? [
              {
                url: image.url,
                width: image.width,
                height: image.height,
                alt: image.description,
                type: 'image/jpeg',
              },
            ]
          : [
              {
                url: 'https://images.ctfassets.net/q0vbuozzojij/5F3799qDHJZgjfhex2cWE7/8cd9ef8bf5ecfe3743d47403acdeaf7d/wine-rack.jpg',
                width: 1260,
                height: 874,
                alt: 'Grape Crush Wine Rack',
                type: 'image/jpeg',
              },
            ],
      }}
      twitter={{
        cardType: 'summary_large_image',
      }}
    />
  )
}

export default Seo

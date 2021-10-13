import React, { FunctionComponent, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import ContentfulImage from '@components/common/ContentfulImage'
import Mailer from '@components/landing-page/mailer/Mailer'
import { Asset } from '@models/contentful-graph'
import { selectGlobal } from '@redux/globalSlice'

const FooterSocial: FunctionComponent = () => {
  const { footer } = useSelector(selectGlobal())
  const [image, setImage] = useState<Asset | null>(null)

  useEffect(() => {
    if (footer) {
      const [data] = footer
      const { image: imageData } = data

      if (!imageData) return

      setImage(imageData)
    }
  }, [footer])

  return (
    <div className="flex flex-col lg:flex-row lg:border-t lg:border-b lg:border-blue-dark">
      <div className="flex w-full h-72 sm:h-96 lg:w-1/2 lg:h-auto">
        <Mailer />
      </div>
      <div className="w-full flex h-72 sm:h-96 lg:w-1/2 lg:h-auto lg:max-h-70vh overflow-hidden">
        <a
          href="https://www.instagram.com/grapecrush.wine"
          className="cursor-pointer relative w-full flex
        transform hover:scale-105 duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2
        -translate-y-1/2 font-bold text-3xl text-lime xl:text-4xl 2xl:text-5xl"
          >
            <span>@grapecrush.wine</span>
          </div>
          {image && <ContentfulImage image={image} />}
        </a>
      </div>
    </div>
  )
}

export default FooterSocial

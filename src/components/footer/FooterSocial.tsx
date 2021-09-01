import React, { FunctionComponent, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import Mailer from '@components/landing-page/mailer/Mailer'
import { CmsImage } from '@lib/cms'
import { selectGlobal } from '@redux/globalSlice'

const FooterSocial: FunctionComponent = () => {
  const { footer, locale } = useSelector(selectGlobal())
  const [image, setImage] = useState<CmsImage | null>(null)

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
      <div className="flex w-full h-60 sm:h-96 lg:w-1/2 lg:h-auto">
        <Mailer />
      </div>
      <div className="relative w-full flex h-60 sm:h-96 lg:w-1/2 lg:h-auto lg:max-h-70vh">
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2
        -translate-y-1/2 font-bold text-3xl text-lime xl:text-4xl 2xl:text-5xl"
        >
          <a href="https://instagram.com/grapecrush.wine">@grapecrush.wine</a>
        </div>
        {image && (
          <img
            src={image.file[locale].url}
            alt={image?.description?.[locale] || 'Wine racks'}
            className="object-cover"
          />
        )}
      </div>
    </div>
  )
}

export default FooterSocial

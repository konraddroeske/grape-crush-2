import React, { FunctionComponent } from 'react'

import Image from 'next/image'
import { useSelector } from 'react-redux'

import { CmsImage } from '@lib/cms'
import { selectGlobal } from '@redux/globalSlice'

interface OwnProps {
  image: CmsImage
}

type Props = OwnProps

const ContentfulImage: FunctionComponent<Props> = ({ image }) => {
  const { locale } = useSelector(selectGlobal())
  const { file, description } = image

  const src = `https:${file[locale].url}`
  const alt = description?.[locale] || ''
  const { width, height } = file?.[locale]?.details?.image

  return (
    <div className="relative image-container">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover"
        layout="responsive"
      />
    </div>
  )
}

export default ContentfulImage

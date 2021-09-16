import React, { FunctionComponent } from 'react'

import Image from 'next/image'
import { useSelector } from 'react-redux'

import { CmsImage } from '@lib/cms'
import { selectGlobal } from '@redux/globalSlice'

interface OwnProps {
  image: CmsImage
  objectFit?: 'object-contain' | 'object-cover'
  containerStyles?: string
}

type Props = OwnProps

const ContentfulImage: FunctionComponent<Props> = ({
  image,
  objectFit = 'object-cover',
  containerStyles = '',
}) => {
  const { locale } = useSelector(selectGlobal())
  const { file, description } = image

  const src = `https:${file[locale].url}`
  const alt = description?.[locale] || ''
  const { width, height } = file?.[locale]?.details?.image

  return (
    <div className={`relative image-container ${containerStyles}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={objectFit}
        layout="responsive"
      />
    </div>
  )
}

export default ContentfulImage

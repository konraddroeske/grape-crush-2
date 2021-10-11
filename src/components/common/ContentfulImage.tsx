import React, { FunctionComponent, useRef } from 'react'

import Image from 'next/image'

import { Asset } from '@models/contentful-graph'

interface OwnProps {
  image: Asset
  // objectFit?: 'object-contain' | 'object-cover'
  imageStyle?: string
  containerStyles?: string
  layout?: 'fixed' | 'fill' | 'intrinsic' | 'responsive' | undefined
}

type Props = OwnProps

const ContentfulImage: FunctionComponent<Props> = ({
  image,
  imageStyle = 'object-cover',
  containerStyles = '',
  layout = 'responsive',
}) => {
  const imgRef = useRef(null)
  const { url, description, width, height } = image

  return (
    <div
      ref={imgRef}
      className={`relative image-container overflow-hidden ${containerStyles}`}
    >
      <Image
        src={url}
        alt={description || ''}
        width={width}
        height={height}
        className={`${imageStyle}`}
        layout={layout}
        lazyBoundary="500px"
      />
    </div>
  )
}

export default ContentfulImage

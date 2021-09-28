import React, { FunctionComponent } from 'react'

import Image from 'next/image'

import { Asset } from '@models/contentful-graph'

interface OwnProps {
  image: Asset
  objectFit?: 'object-contain' | 'object-cover'
  containerStyles?: string
}

type Props = OwnProps

const ContentfulImage: FunctionComponent<Props> = ({
  image,
  objectFit = 'object-cover',
  containerStyles = '',
}) => {
  const { url, description, width, height } = image

  return (
    <div
      className={`relative image-container overflow-hidden ${containerStyles}`}
    >
      <Image
        src={url}
        alt={description || ''}
        width={width}
        height={height}
        className={objectFit}
        layout="responsive"
        lazyBoundary="500px"
      />
    </div>
  )
}

export default ContentfulImage

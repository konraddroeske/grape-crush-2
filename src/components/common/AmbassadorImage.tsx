import React, { FunctionComponent } from 'react'

import NextImage from 'next/image'

interface OwnProps {
  url: string
  title: string
  imageStyle?: string
}

type Props = OwnProps

const AmbassadorImage: FunctionComponent<Props> = ({
  url,
  title,
  imageStyle = 'object-contain',
}) => {
  return (
    <div className="relative w-full h-full">
      <NextImage
        key={url}
        src={url}
        alt={title}
        className={`mix-blend-multiply ${imageStyle}`}
        layout="fill"
        lazyBoundary="500px"
      />
    </div>
  )
}

export default AmbassadorImage

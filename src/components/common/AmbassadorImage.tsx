import React, { FunctionComponent } from 'react'

import NextImage from 'next/image'

interface OwnProps {
  url: string
  title: string
}

type Props = OwnProps

const AmbassadorImage: FunctionComponent<Props> = ({ url, title }) => {
  return (
    <div className="relative w-full h-full">
      <NextImage
        src={url}
        alt={title}
        className="mix-blend-multiply object-contain"
        layout="fill"
      />
    </div>
  )
}

export default AmbassadorImage

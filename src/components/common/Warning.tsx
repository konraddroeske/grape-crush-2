import React, { FunctionComponent } from 'react'

import Star from '@assets/svgs/star.svg'

interface OwnProps {
  text: string
  children: React.ReactNode
}

type Props = OwnProps

const Warning: FunctionComponent<Props> = ({ text, children }) => {
  return (
    <div className="text-center">
      <div className="relative">
        <h1 className="relative z-10 text-6xl text-blue-dark font-bold xs:text-7xl 2xl:text-9xl">
          {text}
        </h1>
        <Star className="absolute w-full max-w-xs top-1/2 left-1/2 translate-warning 2xl:max-w-md" />
      </div>
      <div className="font-headline relative z-10 my-4">{children}</div>
    </div>
  )
}

export default Warning

import React, { FunctionComponent } from 'react'

import AnimatedText from '@components/common/AnimatedText'

interface OwnProps {
  children: React.ReactNode
}

type Props = OwnProps

const InfoBoxTitle: FunctionComponent<Props> = ({ children }) => {
  return (
    <AnimatedText
      blockType="h3"
      textStyles="text-4xl font-bold center text-blue-dark text-center leading-none
          sm:text-left sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-8xl"
    >
      {children}
    </AnimatedText>
  )
}

export default InfoBoxTitle

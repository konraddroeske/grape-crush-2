import React, { FunctionComponent } from 'react'

import AnimatedText from '@components/common/AnimatedText'

interface OwnProps {
  children: React.ReactNode
}

type Props = OwnProps

const InfoBoxText: FunctionComponent<Props> = ({ children }) => {
  return (
    <AnimatedText
      blockType="p"
      textStyles="font-headline text-blue-dark text-lg font-medium leading-tight
    text-center my-4 sm:text-left lg:text-2xl xl:text-2xl"
      delay={0.5}
    >
      {children}
    </AnimatedText>
  )
}

export default InfoBoxText

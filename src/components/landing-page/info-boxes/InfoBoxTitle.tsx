import React, { FunctionComponent } from 'react'

interface OwnProps {
  children: React.ReactNode
}

type Props = OwnProps

const InfoBoxTitle: FunctionComponent<Props> = ({ children }) => {
  return (
    <h3
      className="text-lg font-bold center text-blue-dark text-center capitalize leading-tight
          sm:text-left sm:text-2xl md:text-4xl lg:text-5xl xl:text-7xl 2xl:text-8xl"
    >
      {children}
    </h3>
  )
}

export default InfoBoxTitle

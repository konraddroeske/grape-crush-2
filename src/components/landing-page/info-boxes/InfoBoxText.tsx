import React, { FunctionComponent } from 'react'

interface OwnProps {
  children: React.ReactNode
}

type Props = OwnProps

const InfoBoxText: FunctionComponent<Props> = ({ children }) => {
  return (
    <p className="text-xs text-center py-2 sm:text-left sm:text-sm lg:py-4 lg:text-base xl:text-lg">
      {children}
    </p>
  )
}

export default InfoBoxText

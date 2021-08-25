import React, { FunctionComponent } from 'react'

interface OwnProps {
  children: React.ReactNode
}

type Props = OwnProps

const InfoBoxText: FunctionComponent<Props> = ({ children }) => {
  return (
    <p className="font-headline text-blue-dark text-xs text-center py-2 sm:text-left sm:text-sm lg:py-4 lg:text-lg xl:text-xl">
      {children}
    </p>
  )
}

export default InfoBoxText

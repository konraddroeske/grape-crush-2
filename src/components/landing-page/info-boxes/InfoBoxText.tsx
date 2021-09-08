import React, { FunctionComponent } from 'react'

interface OwnProps {
  children: React.ReactNode
}

type Props = OwnProps

const InfoBoxText: FunctionComponent<Props> = ({ children }) => {
  return (
    <p
      className="font-headline text-blue-dark text-lg font-medium leading-tight
    text-center my-4 sm:text-left lg:text-lg xl:text-xl"
    >
      {children}
    </p>
  )
}

export default InfoBoxText

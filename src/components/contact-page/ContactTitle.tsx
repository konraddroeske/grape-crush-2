import React, { FunctionComponent } from 'react'

interface OwnProps {
  children: React.ReactNode
}

type Props = OwnProps

const ContactTitle: FunctionComponent<Props> = ({ children }) => {
  return (
    <h2 className="text-center text-blue-dark font-medium text-2xl 2xl:text-3xl">
      {children}
    </h2>
  )
}

export default ContactTitle

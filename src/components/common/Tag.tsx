import React, { FunctionComponent } from 'react'

interface OwnProps {
  children: React.ReactNode
}

type Props = OwnProps

const Tag: FunctionComponent<Props> = ({ children }) => {
  return (
    <button
      type="button"
      className="font-sans text-2xs font-light py-2 px-4 rounded-3xl uppercase bg-lime-lightest"
    >
      {children}
    </button>
  )
}

export default Tag

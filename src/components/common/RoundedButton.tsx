import React, { FunctionComponent } from 'react'

interface OwnProps {
  children: React.ReactNode
}

type Props = OwnProps

const RoundedButton: FunctionComponent<Props> = ({ children }) => {
  return (
    <button
      type="button"
      className="py-2 mx-auto my-3 w-48 font-bold text-xs uppercase rounded-3xl border-2 border-lime"
    >
      {children}
    </button>
  )
}

export default RoundedButton

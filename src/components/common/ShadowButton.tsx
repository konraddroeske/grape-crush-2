import React, { FunctionComponent } from 'react'

interface OwnProps {
  text: string
}

type Props = OwnProps

const ShadowButton: FunctionComponent<Props> = ({ text }) => {
  return (
    <button
      type="button"
      className="text-md text-blue-dark font-bold uppercase bg-lime py-2 px-6
      shadow-blue-dark border border-blue-dark"
    >
      {text}
    </button>
  )
}

export default ShadowButton

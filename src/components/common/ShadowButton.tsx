import React, { FunctionComponent } from 'react'

interface OwnProps {
  text: string
  variant?: 'default' | 'nav'
  fn: () => void
}

type Props = OwnProps

const ShadowButton: FunctionComponent<Props> = ({
  text,
  variant = 'default',
  fn,
}) => {
  const variants = {
    default: 'text-blue-dark bg-lime shadow-blue-dark border-blue-dark',
    nav: 'text-lime bg-transparent shadow-white border-white',
  }

  return (
    <button
      type="button"
      className={`${variants[variant]} text-base font-bold uppercase py-2 px-6 
      border 2xl:px-6 2xl:py-2 2xl:text-xl`}
      onClick={() => fn()}
    >
      {text}
    </button>
  )
}

export default ShadowButton

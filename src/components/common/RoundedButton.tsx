import React, { FunctionComponent, useRef } from 'react'

interface OwnProps {
  children: React.ReactNode
  variant: 'lg' | 'md' | 'sm'
}

type Props = OwnProps

const RoundedButton: FunctionComponent<Props> = ({ children, variant }) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const variants = {
    lg: 'w-60',
    md: 'w-48',
    sm: 'w-32',
  }

  return (
    <button
      type="button"
      ref={buttonRef}
      className={`py-2 my-2 mx-auto ${variants[variant]} font-bold text-white text-xs bg-blue uppercase rounded-3xl border-2 border-blue`}
    >
      {children}
    </button>
  )
}

export default RoundedButton

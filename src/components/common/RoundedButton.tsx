import React, { FunctionComponent, useRef } from 'react'

interface OwnProps {
  children: React.ReactNode
  variant: 'full' | 'lg' | 'md' | 'sm'
  margin?: string
}

type Props = OwnProps

const RoundedButton: FunctionComponent<Props> = ({
  children,
  variant,
  margin = 'mx-auto',
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const variants = {
    full: 'w-full',
    lg: 'w-60',
    md: 'w-48',
    sm: 'w-32',
  }

  return (
    <button
      type="button"
      ref={buttonRef}
      className={`py-2 my-2 ${margin} ${variants[variant]} font-bold text-white text-xs bg-blue uppercase rounded-3xl border-2 border-blue`}
    >
      {children}
    </button>
  )
}

export default RoundedButton

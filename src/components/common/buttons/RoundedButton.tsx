import React, { FunctionComponent, useRef } from 'react'

interface OwnProps {
  children: React.ReactNode
  variant: 'full' | 'lg' | 'md' | 'sm'
  marginX?: string
  marginY?: string
}

type Props = OwnProps

const RoundedButton: FunctionComponent<Props> = ({
  children,
  variant,
  marginX = 'mx-auto',
  marginY = 'my-2',
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
      className={`py-2 h-9 ${marginY} ${marginX} ${variants[variant]} font-bold text-white text-xs bg-blue uppercase rounded-3xl border-2 border-blue`}
    >
      {children}
    </button>
  )
}

export default RoundedButton

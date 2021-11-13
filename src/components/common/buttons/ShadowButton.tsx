import React, { FunctionComponent, useRef } from 'react'

import { buttonContract, buttonExpand } from '@lib/animations'

interface OwnProps {
  variant?: 'default' | 'nav' | 'contact'
  fn: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  children: React.ReactNode
}

type Props = OwnProps

const ShadowButton: FunctionComponent<Props> = ({
  variant = 'default',
  fn,
  type = 'button',
  disabled = false,
  children,
}) => {
  const variants = {
    default:
      'text-blue-dark bg-lime hover:bg-lime shadow-blue-dark border-blue-dark',
    nav: 'text-lime bg-transparent shadow-white border-white',
    contact: 'text-blue-dark bg-white shadow-blue-dark border-blue-dark',
  }

  const shadowColor = {
    default: '#2c148e',
    nav: '#ffffff',
    contact: '#2c148e',
  }

  const button = useRef<HTMLButtonElement>(null)

  return (
    <button
      ref={button}
      type={type === 'button' ? 'button' : 'submit'}
      className={`${variants[variant]} text-base font-bold uppercase py-2 px-6 
      border 2xl:px-6 2xl:py-2 2xl:text-xl`}
      onClick={() => fn()}
      onMouseEnter={() => buttonExpand(button.current, shadowColor[variant])}
      onMouseLeave={() => buttonContract(button.current, shadowColor[variant])}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default ShadowButton

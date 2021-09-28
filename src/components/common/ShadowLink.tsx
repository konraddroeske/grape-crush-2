import React, { FunctionComponent, useRef } from 'react'

import { buttonContract, buttonExpand } from '@lib/animations'

interface OwnProps {
  children: React.ReactNode
  variant?: 'default' | 'nav' | 'contact'
}

type Props = OwnProps

const ShadowLink: FunctionComponent<Props> = ({
  children,
  variant = 'default',
}) => {
  const variants = {
    default:
      'text-blue-dark bg-lime shadow-blue-dark border-blue-dark hover:bg-lime',
    nav: 'text-lime bg-transparent shadow-white border-white',
    contact: 'text-blue-dark bg-white shadow-blue-dark border-blue-dark',
  }

  const shadowColor = {
    default: '#2c148e',
    nav: '#ffffff',
    contact: '#2c148e',
  }

  const button = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={button}
      className={`${variants[variant]} relative text-base font-bold uppercase py-2 px-6 
      border 2xl:px-6 2xl:py-2 2xl:text-xl`}
      onMouseEnter={() => buttonExpand(button.current, shadowColor[variant])}
      onMouseLeave={() => buttonContract(button.current, shadowColor[variant])}
    >
      {children}
      {/* <div className="relative z-10">{children}</div> */}
      {/* <div className="absolute inset-0 bg-lime transform scale-y-0 origin-bottom" /> */}
    </div>
  )
}

export default ShadowLink

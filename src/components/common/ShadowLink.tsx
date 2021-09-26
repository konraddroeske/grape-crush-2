import React, { FunctionComponent } from 'react'

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
    default: 'text-blue-dark bg-lime shadow-blue-dark border-blue-dark',
    nav: 'text-lime bg-transparent shadow-white border-white',
    contact: 'text-blue-dark bg-white shadow-blue-dark border-blue-dark',
  }

  return (
    <div
      className={`${variants[variant]} text-base font-bold uppercase py-2 px-6 
      border 2xl:px-6 2xl:py-2 2xl:text-xl`}
    >
      {children}
    </div>
  )
}

export default ShadowLink

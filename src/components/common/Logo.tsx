import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import { selectHero } from '@redux/heroSlice'

import GrapeCrushLogo from '../../assets/svgs/grape-crush-logo.svg'

const Logo: FunctionComponent = () => {
  const { currentTheme } = useSelector(selectHero())
  const { nav } = currentTheme

  const color: { [key: string]: string } = {
    'gray-dark': 'svg-gray-dark',
    white: 'svg-white',
  }

  return (
    <div className="font-sans w-36 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <GrapeCrushLogo className={`w-full ${color[nav]}`} />
    </div>
  )
}

export default Logo

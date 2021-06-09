import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import { selectHero } from '@redux/heroSlice'

const Hamburger: FunctionComponent = () => {
  const { currentTheme } = useSelector(selectHero())
  const { nav } = currentTheme

  const color: { [key: string]: string } = {
    'gray-dark': 'bg-gray-dark',
    white: 'bg-white',
  }

  return (
    <div className="flex flex-col justify-between h-3.5">
      <div className={`w-5 h-0.5 transition duration-700 ${color[nav]}`} />
      <div className={`w-5 h-0.5 transition duration-700 ${color[nav]}`} />
      <div className={`w-5 h-0.5 transition duration-700 ${color[nav]}`} />
    </div>
  )
}

export default Hamburger

import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import { selectHero } from '@redux/heroSlice'

interface OwnProps {
  children: React.ReactNode
}

type Props = OwnProps

const RoundedButton: FunctionComponent<Props> = ({ children }) => {
  const { currentTheme } = useSelector(selectHero())
  const { buttonText, buttonBorder } = currentTheme

  const textColors: { [key: string]: string } = {
    white: 'text-white',
    'gray-dark': 'text-gray-dark',
  }

  const borderColors: { [key: string]: string } = {
    lime: 'border-lime',
    orange: 'border-orange',
  }
  return (
    <button
      type="button"
      className={`py-2 mx-auto my-3 w-48 font-bold 
      ${textColors[buttonText]} text-xs uppercase 
      rounded-3xl border-2 ${borderColors[buttonBorder]}
      transition duration-700`}
    >
      {children}
    </button>
  )
}

export default RoundedButton

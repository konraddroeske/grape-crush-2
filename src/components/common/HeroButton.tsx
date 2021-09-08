import React, { FunctionComponent, useEffect, useRef } from 'react'

import gsap from 'gsap'
import { useSelector } from 'react-redux'

import { selectHero } from '@redux/heroSlice'

interface OwnProps {
  children: React.ReactNode
}

type Props = OwnProps

const HeroButton: FunctionComponent<Props> = ({ children }) => {
  const { currentTheme } = useSelector(selectHero())
  const { buttonText, buttonBorder, duration } = currentTheme

  const buttonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    gsap.to(buttonRef.current, {
      duration,
      borderColor: buttonBorder,
      color: buttonText,
    })
  }, [duration, buttonText, buttonBorder])

  return (
    <button
      type="button"
      ref={buttonRef}
      className="py-2 mx-auto my-0 w-48 font-bold text-xs uppercase rounded-3xl border-2"
    >
      {children}
    </button>
  )
}

export default HeroButton

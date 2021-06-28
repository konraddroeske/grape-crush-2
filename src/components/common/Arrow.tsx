import React, { FunctionComponent, useEffect } from 'react'

import gsap from 'gsap'
import { useSelector } from 'react-redux'

import { Direction } from '@models/hero'

import { selectHero } from '@redux/heroSlice'

import LeftArrow from '../../assets/svgs/left-arrow.svg'
import RightArrow from '../../assets/svgs/right-arrow.svg'

interface OwnProps {
  direction: Direction
}

type Props = OwnProps

const Arrow: FunctionComponent<Props> = ({ direction }) => {
  const { currentTheme } = useSelector(selectHero())
  const { duration, arrows } = currentTheme

  useEffect(() => {
    gsap.to('.svg-hero-arrow path', {
      duration,
      fill: arrows,
    })
  }, [duration, arrows])

  return (
    <>
      {direction === Direction.Left && (
        <div className="w-8 md:w-12 xl:w-14">
          <LeftArrow className="svg-hero-arrow" />
        </div>
      )}
      {direction === Direction.Right && (
        <div className="w-8 md:w-12 xl:w-14">
          <RightArrow className="svg-hero-arrow" />
        </div>
      )}
    </>
  )
}

export default Arrow

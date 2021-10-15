import React, { FunctionComponent } from 'react'

import { Direction } from '@models/misc'

import LeftArrow from '../../assets/svgs/fat-arrow-left.svg'
import RightArrow from '../../assets/svgs/fat-arrow-right.svg'

interface OwnProps {
  direction: Direction
  variant?: 'features' | 'item'
}

type Props = OwnProps

const Arrow: FunctionComponent<Props> = ({
  direction,
  variant = 'features',
}) => {
  const variants = {
    features: 'w-12 sm:w-20 lg:w-28 xl:w-32',
    item: 'w-10 sm:w-12 lg:w-16 xl:w-20',
  }

  return (
    <>
      {direction === Direction.Left && (
        <div className={variants[variant]}>
          <LeftArrow className="svg-hero-arrow" />
        </div>
      )}
      {direction === Direction.Right && (
        <div className={variants[variant]}>
          <RightArrow className="svg-hero-arrow" />
        </div>
      )}
    </>
  )
}

export default Arrow

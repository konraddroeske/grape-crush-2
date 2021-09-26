import React, { FunctionComponent } from 'react'

import { Direction } from '@models/misc'

import LeftArrow from '../../assets/svgs/fat-arrow-left.svg'
import RightArrow from '../../assets/svgs/fat-arrow-right.svg'

interface OwnProps {
  direction: Direction
}

type Props = OwnProps

const Arrow: FunctionComponent<Props> = ({ direction }) => {
  return (
    <>
      {direction === Direction.Left && (
        <div className="w-12 sm:w-20 lg:w-28 xl:w-32">
          <LeftArrow className="svg-hero-arrow" />
        </div>
      )}
      {direction === Direction.Right && (
        <div className="w-12 sm:w-20 lg:w-28 xl:w-32">
          <RightArrow className="svg-hero-arrow" />
        </div>
      )}
    </>
  )
}

export default Arrow

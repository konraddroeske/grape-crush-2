import React, { FunctionComponent } from 'react'

import { Direction } from '@models/hero'

import LeftArrow from '../../assets/svgs/left-arrow.svg'
import RightArrow from '../../assets/svgs/right-arrow.svg'

interface OwnProps {
  direction: Direction
}

type Props = OwnProps

const Arrow: FunctionComponent<Props> = ({ direction }) => {
  return (
    <>
      {direction === Direction.Left && (
        <div className="w-8 md:w-12 lg:w-16">
          <LeftArrow />
        </div>
      )}
      {direction === Direction.Right && (
        <div className="w-8 md:w-12 lg:w-16">
          <RightArrow />
        </div>
      )}
    </>
  )
}

export default Arrow

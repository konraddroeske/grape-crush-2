import React, { FunctionComponent } from 'react'

import Arrow from '@components/common/Arrow'
import { Direction } from '@models/hero'

interface OwnProps {
  handleSlide: (direction: number) => void
}

type Props = OwnProps

const SlideButtons: FunctionComponent<Props> = ({ handleSlide }) => {
  return (
    <div
      className="buttonContainer absolute transform -translate-y-1/2 left-0
    right-0 sm:left-1/6 sm:right-1/6 top-1/2 flex justify-between nav-gutter-s sm:px-0"
    >
      <button
        type="button"
        className="sm:transform sm:-translate-x-1/2"
        onClick={() => handleSlide(Direction.Left)}
      >
        <Arrow direction={Direction.Left} />
      </button>
      <button
        type="button"
        className="sm:transform sm:translate-x-1/2"
        onClick={() => handleSlide(Direction.Right)}
      >
        <Arrow direction={Direction.Right} />
      </button>
    </div>
  )
}

export default SlideButtons

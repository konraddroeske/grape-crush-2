import React, { FunctionComponent } from 'react'

import Arrow from '@components/common/Arrow'
import { Direction } from '@models/hero'

interface OwnProps {
  handleSlide: (direction: number) => void
}

type Props = OwnProps

const SlideButtons: FunctionComponent<Props> = ({ handleSlide }) => {
  return (
    <div className="buttonContainer absolute transform -translate-y-1/2 left-0 right-0 top-1/2 flex justify-between nav-gutter-s">
      <button
        type="button"
        className=""
        onClick={() => handleSlide(Direction.Left)}
      >
        <Arrow direction={Direction.Left} />
      </button>
      <button
        type="button"
        className=""
        onClick={() => handleSlide(Direction.Right)}
      >
        <Arrow direction={Direction.Right} />
      </button>
    </div>
  )
}

export default SlideButtons

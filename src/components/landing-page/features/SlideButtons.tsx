import React, { FunctionComponent } from 'react'

import Arrow from '@components/common/Arrow'

import { Direction } from '@models/misc'

interface OwnProps {
  handleSlide: (direction: number) => void
}

type Props = OwnProps

const SlideButtons: FunctionComponent<Props> = ({ handleSlide }) => {
  return (
    <div className="pointer-events-none slideshow-button-position">
      <button
        type="button"
        className="pointer-events-auto mx-3 md:hidden"
        aria-label="slide left"
        onClick={() => handleSlide(Direction.Left)}
      >
        <Arrow direction={Direction.Left} />
      </button>
      <button
        type="button"
        className="pointer-events-auto mx-3 md:mx-0 md:transform md:translate-x-2/3"
        aria-label="slide right"
        onClick={() => handleSlide(Direction.Right)}
      >
        <Arrow direction={Direction.Right} />
      </button>
    </div>
  )
}

export default SlideButtons

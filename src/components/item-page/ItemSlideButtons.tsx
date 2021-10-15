import React, { FunctionComponent } from 'react'

import Arrow from '@components/common/Arrow'

import { Direction } from '@models/misc'

interface OwnProps {
  handleSlide: (direction: number) => void
}

type Props = OwnProps

const ItemSlideButtons: FunctionComponent<Props> = ({ handleSlide }) => {
  return (
    <div className="pointer-events-none item-slide-button-position">
      <button
        type="button"
        className="pointer-events-auto transform -translate-x-1/4"
        aria-label="slide left"
        onClick={() => handleSlide(Direction.Left)}
      >
        <Arrow direction={Direction.Left} variant="item" />
      </button>
      <button
        type="button"
        className="pointer-events-auto transform translate-x-1/4"
        aria-label="slide right"
        onClick={() => handleSlide(Direction.Right)}
      >
        <Arrow direction={Direction.Right} variant="item" />
      </button>
    </div>
  )
}

export default ItemSlideButtons

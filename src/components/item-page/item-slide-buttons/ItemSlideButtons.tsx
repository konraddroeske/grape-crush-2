import React, { FunctionComponent } from 'react'

import Arrow from '@components/common/Arrow'

import { Direction } from '@models/misc'

import s from './ItemSlideButtons.module.scss'

interface OwnProps {
  handleSlide: (direction: number) => void
  variant?: 'products' | 'item'
}

type Props = OwnProps

const ItemSlideButtons: FunctionComponent<Props> = ({
  handleSlide,
  variant = 'item',
}) => {
  const variants = {
    item: s.itemSlideButtonPosition,
    products: s.productsSlideButtonPosition,
  }

  return (
    <div className={variants[variant]}>
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

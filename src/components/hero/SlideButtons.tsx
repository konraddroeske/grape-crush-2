import React, { FunctionComponent } from "react"

import Arrow from "@components/common/Arrow"
import { Direction } from "@models/hero"

interface OwnProps {
  animateSlides: (direction: number) => void
}

type Props = OwnProps

const SlideButtons: FunctionComponent<Props> = ({ animateSlides }) => {
  return (
    <div className="buttonContainer absolute left-0 right-0 top-1/2 flex justify-between">
      <button type="button" className="" onClick={() => animateSlides(1)}>
        <Arrow direction={Direction.Left} />
      </button>
      <button type="button" className="" onClick={() => animateSlides(-1)}>
        <Arrow direction={Direction.Right} />
      </button>
    </div>
  )
}

export default SlideButtons

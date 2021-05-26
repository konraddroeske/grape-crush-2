import React, { FunctionComponent } from "react"

import { Direction } from "@models/hero"

import LeftArrow from "../../assets/svgs/left-arrow.svg"
import RightArrow from "../../assets/svgs/right-arrow.svg"

interface OwnProps {
  direction: Direction
}

type Props = OwnProps

const Arrow: FunctionComponent<Props> = ({ direction }) => {
  return (
    <>
      {direction === Direction.Left && <LeftArrow />}
      {direction === Direction.Right && <RightArrow />}
    </>
  )
}

export default Arrow

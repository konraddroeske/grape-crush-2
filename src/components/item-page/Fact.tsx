import React, { FunctionComponent } from 'react'

interface OwnProps {
  category: string
  value: string
}

type Props = OwnProps

const Fact: FunctionComponent<Props> = ({ category, value }) => {
  return (
    <div className="my-2">
      <span className="capitalize font-bold text-lime">{category}: </span>
      <span className="capitalize font-sans text-white">{value}</span>
    </div>
  )
}

export default Fact

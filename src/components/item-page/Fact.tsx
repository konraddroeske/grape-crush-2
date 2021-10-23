import React, { FunctionComponent } from 'react'

interface OwnProps {
  category: string
  value: string
}

type Props = OwnProps

const Fact: FunctionComponent<Props> = ({ category, value }) => {
  return (
    <div className="my-2">
      <span className="font-bold text-blue-dark uppercase">{category}: </span>
      <span className="text-sm text-blue-dark uppercase break-words">
        {value}
      </span>
    </div>
  )
}

export default Fact

import React, { FunctionComponent } from 'react'

interface OwnProps {
  name: string
  fontSize?: string
}

type Props = OwnProps

const ProductTitle: FunctionComponent<Props> = ({
  name,
  fontSize = 'text-base',
}) => {
  return (
    <h4
      className={`title ${fontSize} leading-4 font-bold uppercase line-clamp`}
    >
      {name}
    </h4>
  )
}

export default ProductTitle

import React, { FunctionComponent } from 'react'

interface OwnProps {
  region: string
  vintage: string
}

type Props = OwnProps

const ProductSubheading: FunctionComponent<Props> = ({ region, vintage }) => {
  return (
    <div className="flex flex-wrap text-sm capitalize h-5 mt-2 overflow-y-hidden">
      {region && <p className="leading-none h-5">{region}</p>}
      {region && vintage && (
        <span className="leading-none h-5">&nbsp;&#8226;&nbsp;</span>
      )}
      <p className="leading-none h-5">{vintage}</p>
    </div>
  )
}

export default ProductSubheading

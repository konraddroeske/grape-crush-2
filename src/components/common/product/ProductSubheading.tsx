import React, { FunctionComponent } from 'react'

interface OwnProps {
  region: string
  vintage: string
}

type Props = OwnProps

const ProductSubheading: FunctionComponent<Props> = ({ region, vintage }) => {
  return (
    <div className="flex flex-wrap justify-center text-sm capitalize h-5 mt-2">
      {region && <p className="h-5">{region}</p>}
      {region && vintage && <span className="h-5">&nbsp;&#8226;&nbsp;</span>}
      <p className="h-5">{vintage}</p>
    </div>
  )
}

export default ProductSubheading

import React, { FunctionComponent } from 'react'

interface OwnProps {
  region?: string
  vintage?: string
  variant?: 'slideshow' | 'card'
}

type Props = OwnProps

const ProductSubheading: FunctionComponent<Props> = ({
  region,
  vintage,
  variant = 'card',
}) => {
  const variants = {
    card: 'flex flex-wrap justify-start text-sm capitalize h-5 mt-1 font-bold overflow-hidden',
    slideshow:
      'flex flex-wrap justify-start text-sm capitalize h-5 my-1 font-bold overflow-hidden',
  }

  return (
    <div className={variants[variant]}>
      {region && <p className="h-5">{region}</p>}
      {region && vintage && <span className="h-5">&nbsp;&#8226;&nbsp;</span>}
      {vintage && <p className="h-5">{vintage}</p>}
    </div>
  )
}

export default ProductSubheading

import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import { Asset } from '@models/contentful-graph'
import { selectProducts } from '@redux/productsSlice'

interface OwnProps {
  categoryImage: string
  svgMask: Asset
}

type Props = OwnProps

const SvgPreview: FunctionComponent<Props> = ({ categoryImage, svgMask }) => {
  const { categories } = useSelector(selectProducts())

  return (
    <ul className="z-50 absolute left-0 top-0 w-full h-full min-w-64 xl:scale-110 2xl:scale-125">
      {categories.map((category) => {
        return (
          <li key={category.categoryName} className="h-full absolute inset-0">
            <div
              className="w-full mask-nav transition duration-300"
              style={{
                backgroundImage: `url(${category.image.url})`,
                maskImage: `url(${svgMask.url})`,
                WebkitMaskImage: `url(${svgMask.url})`,
                opacity: categoryImage === category.image.url ? 1 : 0,
              }}
            />
            <div />
          </li>
        )
      })}
    </ul>
  )
}

export default SvgPreview

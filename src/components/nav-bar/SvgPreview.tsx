import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import ContentfulImage from '@components/common/ContentfulImage'
import { Asset } from '@models/contentful-graph'
import { selectGlobal } from '@redux/globalSlice'

interface OwnProps {
  categoryImage: string
  svgMask: Asset
}

type Props = OwnProps

const SvgPreview: FunctionComponent<Props> = ({ categoryImage, svgMask }) => {
  const { categories } = useSelector(selectGlobal())

  return (
    <ul
      className="z-50 absolute left-0 top-0 lg:left-1/2 lg:top-1/2 transform
      lg:-translate-x-1/2 lg:-translate-y-1/2 mask-background-nav h-full min-w-64
      xl:scale-110 2xl:scale-125"
    >
      {categories.map((category) => {
        return (
          <li key={category.categoryName} className="h-full absolute inset-0">
            <div
              className="relative w-full mask-nav transition duration-300"
              style={{
                maskImage: `url(${svgMask.url})`,
                WebkitMaskImage: `url(${svgMask.url})`,
                opacity: categoryImage === category.image.url ? 1 : 0,
              }}
            >
              <div className="w-full h-full flex absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <ContentfulImage image={category.image} />
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default SvgPreview

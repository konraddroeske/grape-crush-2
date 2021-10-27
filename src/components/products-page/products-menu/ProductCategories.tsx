import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import Category from '@components/products-page/products-menu/Category'
import { selectProducts } from '@redux/productsSlice'

interface Props {
  closeMobileMenu?: () => void
}

// interface TagOptions {
//   parentType: string[]
//   category: string[]
//   type: string[]
//   style: string[]
//   country: string[]
//   varietal: string[]
//   priceRange: string[]
// }

const ProductCategories: FunctionComponent<Props> = () => {
  const { allTags } = useSelector(selectProducts())

  return (
    <div>
      {allTags && (
        <>
          <Category
            title="Type"
            category="parentType"
            tagsObj={allTags.parentType}
          />
          <Category
            title="Category"
            category="category"
            tagsObj={allTags.category}
          />
          <Category title="Featured" category="type" tagsObj={allTags.type} />
          <Category title="Style" category="style" tagsObj={allTags.style} />
          <Category
            title="Price Range"
            category="range"
            tagsObj={allTags.range}
          />
          <Category
            title="Country"
            category="country"
            tagsObj={allTags.country}
          />
          <Category
            title="Varietal"
            category="varietal"
            tagsObj={allTags.varietal}
          />
        </>
      )}
    </div>
  )
}

export default ProductCategories

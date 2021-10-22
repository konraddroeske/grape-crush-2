import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import ProductsBreadcrumbLink from '@components/products-page/products-bar/ProductsBreadcrumbLink'
import { selectProducts } from '@redux/productsSlice'

interface Props {
  variant?: 'mobile' | 'desktop'
}

const ProductsBreadcrumbs: FunctionComponent<Props> = ({
  variant = 'desktop',
}) => {
  // const { isLoading } = useSelector(selectClient())
  const { selectedTags } = useSelector(selectProducts())
  const { parentType, category } = selectedTags

  const variants = {
    mobile: `h-8 lg:h-12 flex justify-center sm:justify-start flex-wrap text-xs leading-none font-bold overflow-hidden`,
    desktop: `h-8 lg:h-12 flex flex-wrap text-xs leading-none font-bold overflow-hidden`,
  }

  return (
    <>
      <div className={variants[variant]}>
        <ProductsBreadcrumbLink
          hasBorder={parentType.length === 0 && category.length === 0}
          category=""
          tag=""
        />
        {parentType.length > 0 && (
          <ProductsBreadcrumbLink
            hasBorder={category.length === 0}
            category="parentType"
            tag={parentType[0]}
          />
        )}
        {category.length > 0 && (
          <ProductsBreadcrumbLink
            hasBorder
            category="category"
            tag={category[0]}
          />
        )}
      </div>
    </>
  )
}

export default ProductsBreadcrumbs

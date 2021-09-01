import React, { FunctionComponent, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import { selectProducts } from '@redux/productsSlice'

const ProductsBreadcrumbs: FunctionComponent = () => {
  const router = useRouter()
  const { totalSelected } = useSelector(selectProducts())
  const [currentType, setCurrentType] = useState<string | null>(null)
  const [currentCategory, setCurrentCategory] = useState<string | null>(null)

  const { query } = router

  useEffect(() => {
    const { parentType, category } = query
    if (parentType !== currentType && typeof parentType === 'string') {
      setCurrentType(parentType || null)
    }
    if (category !== currentCategory && typeof category === 'string') {
      setCurrentCategory(category || null)
    }
  }, [query, currentCategory, currentType])

  return (
    <div className="flex items-center text-xs leading-none font-bold">
      <span className="uppercase mr-2 text-base text-blue-dark">
        All Products
      </span>
      {currentType && (
        <>
          <span className="mr-2 text-base">{'>'}</span>
          <span className="mr-2 uppercase text-base text-blue-dark">
            {currentType}
          </span>
        </>
      )}
      {currentCategory && (
        <>
          <span className="mr-2 text-base">{'>'}</span>
          <span className="mr-2 uppercase text-base text-blue-dark">
            {currentCategory}
          </span>
        </>
      )}
      <span className="uppercase mr-2 text-base text-blue-dark">
        ({totalSelected.length})
      </span>
    </div>
  )
}

export default ProductsBreadcrumbs

import React, { FunctionComponent, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

const ProductsBreadcrumbs: FunctionComponent = () => {
  const router = useRouter()
  const [currentType, setCurrentType] = useState<string | null>(null)
  const [currentCategory, setCurrentCategory] = useState<string | null>(null)

  const { query } = router

  useEffect(() => {
    const { parentType, category } = query
    if (parentType !== currentType) {
      setCurrentType(parentType || null)
    }
    if (category !== currentCategory) {
      setCurrentCategory(category || null)
    }
  }, [query, currentCategory, currentType])

  return (
    <div className="flex items-center text-xs leading-none font-bold">
      <span className="uppercase mr-2 text-base text-blue-dark">Shop</span>
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
    </div>
  )
}

export default ProductsBreadcrumbs

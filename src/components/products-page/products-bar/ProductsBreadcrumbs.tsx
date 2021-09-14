import React, { FunctionComponent } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import { simpleRoute } from '@lib/simpleRoute'
import { selectProducts } from '@redux/productsSlice'

const ProductsBreadcrumbs: FunctionComponent = () => {
  const router = useRouter()
  const { selectedTags, totalSelected } = useSelector(selectProducts())

  const { parentType, category } = selectedTags

  return (
    <div
      className="h-8 lg:h-12 flex flex-wrap text-xs leading-none font-bold
    overflow-hidden"
    >
      <div className="h-8 lg:h-12 flex items-center">
        <span className="uppercase mr-2 text-sm sm:text-base text-blue-dark">
          <Link href="/products" shallow>
            <a className="whitespace-nowrap">All Products</a>
          </Link>
        </span>
        {parentType.length === 0 && category.length === 0 && (
          <span className="uppercase mr-2 text-sm sm:text-base text-blue-dark">
            ({totalSelected.length})
          </span>
        )}
      </div>
      {parentType.length > 0 && (
        <div className="flex items-center h-8 lg:h-12">
          <span className="mr-2 text-sm sm:text-base">{'>'}</span>
          <span className="relative">
            <span
              className={`${category.length === 0 ? 'breadcrumb-border' : ''}`}
            >
              <button
                type="button"
                className="mr-2 uppercase text-sm sm:text-base font-bold text-blue-dark"
                onClick={() => simpleRoute(router, 'parentType', parentType[0])}
              >
                {parentType[0]}
              </button>
              {category.length === 0 && (
                <span className="uppercase mr-2 text-sm sm:text-base text-blue-dark">
                  ({totalSelected.length})
                </span>
              )}
            </span>
          </span>
        </div>
      )}
      {category.length > 0 && (
        <div className="flex items-center h-8 lg:h-12 overflow-hidden">
          <span className="mr-2 text-base">{'>'}</span>
          <span className="relative">
            <span className="breadcrumb-border">
              <span className="mr-2 uppercase text-sm sm:text-base text-blue-dark">
                {category[0]}
              </span>
              <span className="uppercase text-sm sm:text-base text-blue-dark">
                ({totalSelected.length})
              </span>
            </span>
          </span>
        </div>
      )}
    </div>
  )
}

export default ProductsBreadcrumbs

import React, { FunctionComponent, useEffect, useState } from 'react'

import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'

import ProductCard from '@components/common/product/ProductCard'

import Warning from '@components/common/Warning'
import PageNav from '@components/products-page/products-list/PageNav'
import { setNavSearch } from '@redux/clientSlice'
import {
  handleProducts,
  handleProductsSearch,
  selectProducts,
} from '@redux/productsSlice'

const ProductsList: FunctionComponent = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const {
    products,
    selectedProducts,
    page,
    selectedTags,
    productsSearch,
    productsSort,
  } = useSelector(selectProducts())

  useEffect(() => {
    setIsLoading(true)

    dispatch(
      handleProducts({
        selectedTags,
        productsSearch: productsSearch.toLowerCase(),
        productsSort,
      })
    )
  }, [products, selectedTags, productsSearch, productsSort, page, dispatch])

  useEffect(() => {
    setIsLoading(false)
  }, [selectedProducts])

  const resetSearch = () => {
    dispatch(setNavSearch(''))
    dispatch(handleProductsSearch(''))
  }

  return (
    <div className="flex flex-col h-full">
      {selectedProducts && selectedProducts?.length > 0 && (
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-8 xl:gap-10">
          {selectedProducts?.map((product) => {
            const { data } = product
            return (
              <li key={product._id}>
                <ProductCard id={product._id} data={data} />
              </li>
            )
          })}
        </ul>
      )}
      {!isLoading && selectedProducts?.length === 0 && (
        <div className="h-full flex justify-center items-center py-24">
          <Warning text="Oops!">
            <p className="font-headline relative z-10 my-4">
              <span className="block">
                We can't find what you were looking&nbsp;for.
              </span>
              <span className="block">
                Try removing{' '}
                <span className="underline">
                  <Link href="/products?page=1" shallow>
                    <a>some filters</a>
                  </Link>
                </span>{' '}
                or{' '}
                <span className="underline">
                  <button
                    type="button"
                    className="underline"
                    onClick={() => resetSearch()}
                  >
                    <a>resetting search</a>
                  </button>
                </span>{' '}
                <br />
                and maybe you'll find it there.
              </span>
            </p>
          </Warning>
        </div>
      )}
      <div className="mt-auto">
        <PageNav />
      </div>
    </div>
  )
}

export default ProductsList

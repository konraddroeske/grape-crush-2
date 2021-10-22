import React, { FunctionComponent, useEffect } from 'react'

import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'

import ProductCard from '@components/common/product/ProductCard'

import Warning from '@components/common/Warning'
import PageNav from '@components/products-page/products-list/PageNav'
import { selectClient, setNavSearch, setSearch } from '@redux/clientSlice'
import {
  handleProducts,
  handleProductsSearch,
  selectProducts,
} from '@redux/productsSlice'

const ProductsList: FunctionComponent = () => {
  const { isLoading } = useSelector(selectClient())
  const dispatch = useDispatch()

  const {
    products,
    selectedProductsByPage,
    page,
    selectedTags,
    totalSelectedTags,
    productsSearch,
    productsSort,
  } = useSelector(selectProducts())

  useEffect(() => {
    dispatch(
      handleProducts({
        selectedTags,
        productsSearch: productsSearch.toLowerCase(),
        productsSort,
      })
    )
  }, [products, selectedTags, productsSearch, productsSort, page, dispatch])

  const resetSearch = () => {
    dispatch(setNavSearch(''))
    dispatch(setSearch(''))
    dispatch(handleProductsSearch(''))
  }

  return (
    <div className="flex flex-col h-full">
      {selectedProductsByPage.length > 0 && (
        <ul
          className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4
        gap-x-2 gap-y-6 sm:gap-8 md:gap-8 xl:gap-10"
        >
          {selectedProductsByPage[page - 1]?.map((product) => {
            const { data } = product
            return (
              <li key={product._id}>
                <ProductCard id={product._id} data={data} />
              </li>
            )
          })}
        </ul>
      )}
      {selectedProductsByPage.length === 0 &&
        (totalSelectedTags > 0 || productsSearch.length > 0) && (
          <div className="h-full flex justify-center items-center pt-32 lg:pt-20">
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
      <div className={`${isLoading ? 'opacity-0' : 'opacity-1'} mt-auto`}>
        <PageNav />
      </div>
    </div>
  )
}

export default ProductsList

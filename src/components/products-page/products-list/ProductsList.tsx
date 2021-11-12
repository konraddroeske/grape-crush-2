import React, { FunctionComponent, useEffect } from 'react'

import { useRouter } from 'next/dist/client/router'
import { useDispatch, useSelector } from 'react-redux'

import ProductCard from '@components/common/product/ProductCard'

import Warning from '@components/common/Warning'
import PageNav from '@components/products-page/products-list/PageNav'
import { setNavSearch, setSearch } from '@redux/clientSlice'
import {
  handlePage,
  handleProducts,
  handleProductsSearch,
  handleTags,
  resetTags,
  selectProducts,
  setPriceRange,
} from '@redux/productsSlice'

const ProductsList: FunctionComponent = () => {
  const dispatch = useDispatch()

  const {
    products,
    selectedProductsByPage,
    page,
    selectedTags,
    productsSearch,
    productsSort,
    priceRange,
    maxPrice,
    totalSelectedTags,
  } = useSelector(selectProducts())

  const router = useRouter()

  useEffect(() => {
    if (Object.values(router.query).length > 0) {
      const { page: queryPage, ...newTags } = router.query

      if (queryPage && !(queryPage instanceof Array)) {
        dispatch(handlePage(parseInt(queryPage, 10)))
      }

      dispatch(handleTags(newTags))
    } else {
      dispatch(handlePage(1))
      dispatch(resetTags())
    }
  }, [router, dispatch])

  useEffect(() => {
    dispatch(
      handleProducts({
        productsSearch: productsSearch.toLowerCase(),
        productsSort,
      })
    )
  }, [
    products,
    selectedTags,
    productsSearch,
    productsSort,
    page,
    priceRange,
    dispatch,
  ])

  const resetSearch = () => {
    dispatch(setNavSearch(''))
    dispatch(setSearch(''))
    dispatch(handleProductsSearch(''))
  }

  const isFilters = totalSelectedTags > 0
  const isSearch = productsSearch.length > 0
  const isPriceRange =
    priceRange.min > 0 ||
    (priceRange.max && maxPrice && priceRange.max < maxPrice)

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
        (isPriceRange || isSearch || isFilters) && (
          <div className="h-full flex justify-center items-center pt-32 lg:pt-20">
            <Warning text="Oops!">
              <p className="font-headline relative z-10 my-4">
                <span className="block">
                  We can't find what you were looking&nbsp;for.
                </span>
                <span className="block">
                  Try removing{' '}
                  <button
                    type="button"
                    className="underline"
                    onClick={() => {
                      dispatch(setPriceRange({ min: 0, max: maxPrice }))
                      router
                        .push('/products?page=1', '/products?page=1', {
                          shallow: true,
                        })
                        .then(() => window.scrollTo(0, 0))
                    }}
                  >
                    some filters
                  </button>{' '}
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

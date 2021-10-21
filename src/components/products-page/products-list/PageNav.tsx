import React, { FunctionComponent, useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import PageLink from '@components/products-page/products-list/PageLink'
import { convertTagsToHref } from '@lib/convertTagsToHref'
import { selectProducts } from '@redux/productsSlice'

import ProductArrow from '../../../assets/svgs/product-arrow.svg'

const PageNav: FunctionComponent = () => {
  const router = useRouter()
  const {
    // totalSelected,
    selectedProductsByPage,
    productsPerPage,
    page: currentPage,
    selectedTags,
  } = useSelector(selectProducts())
  const [totalPages, setTotalPages] = useState(1)
  const [middlePages, setMiddlePages] = useState<number[]>([1])

  useEffect(() => {
    const pageCount =
      selectedProductsByPage.length === 0 ? 1 : selectedProductsByPage.length

    const middle = [currentPage - 1, currentPage, currentPage + 1].filter(
      (ele) => ele > 1 && ele < pageCount
    )

    setMiddlePages(middle)
    setTotalPages(pageCount)
  }, [currentPage, selectedProductsByPage, productsPerPage])

  const handleClick = (newPage: number) => {
    const href = convertTagsToHref(selectedTags, newPage)
    router
      .push(href, href, {
        shallow: true,
        scroll: true,
      })
      .then(() => window.scrollTo(0, 0))
  }

  return (
    <nav className="flex justify-center items-center mt-16">
      <button
        type="button"
        className={`flex items-center ${
          currentPage === 1 ? 'opacity-50' : 'opacity'
        }`}
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <span>
          <ProductArrow className="w-6 svg-blue-dark transform rotate-180" />
        </span>
        <span className="ml-2 uppercase font-bold text-blue-dark">Back</span>
      </button>
      <div className="uppercase font-bold text-xl text-blue-dark mx-4 sm:hidden">
        {currentPage} / {totalPages}
      </div>
      <div className="hidden sm:flex flex-wrap justify-center mx-4">
        <PageLink
          pageNumber={1}
          currentPage={currentPage}
          handleClick={handleClick}
        />
        <div
          className={`font-bold mx-1 ${
            middlePages[0] - 1 > 1 ? 'flex items-center' : 'hidden'
          }`}
        >
          <div>. . .</div>
        </div>
        {middlePages.map((pageNumber) => {
          return (
            <PageLink
              key={pageNumber}
              pageNumber={pageNumber}
              currentPage={currentPage}
              handleClick={handleClick}
            />
          )
        })}
        <div
          className={`font-bold mx-1 ${
            totalPages - middlePages[middlePages.length - 1] > 1
              ? 'flex items-center'
              : 'hidden'
          }`}
        >
          <div>. . .</div>
        </div>
        {totalPages !== 1 && (
          <PageLink
            pageNumber={totalPages}
            currentPage={currentPage}
            handleClick={handleClick}
          />
        )}
      </div>
      <button
        type="button"
        className={`flex items-center ${
          currentPage === totalPages ? 'opacity-50' : 'opacity'
        }`}
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span className="mr-2 uppercase font-bold text-blue-dark">Next</span>
        <span>
          <ProductArrow className="w-6 svg-blue-dark" />
        </span>
      </button>
    </nav>
  )
}

export default PageNav

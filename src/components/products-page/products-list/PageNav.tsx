import React, { FunctionComponent, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { handlePage, selectProducts } from '@redux/productsSlice'

const PageNav: FunctionComponent = () => {
  const dispatch = useDispatch()
  const { totalSelected, productsPerPage, page } = useSelector(selectProducts())
  const [pages, setPages] = useState(1)

  useEffect(() => {
    const numberOfPages = Math.ceil(totalSelected / productsPerPage)
    setPages(numberOfPages)
  }, [totalSelected, productsPerPage])

  const handleClick = (newPage: number) => {
    dispatch(handlePage(newPage))
  }

  return (
    <nav className="mt-8">
      <ul className="flex flex-wrap justify-center">
        {Array.from(Array(pages).keys()).map((ele) => {
          return (
            <li key={ele}>
              <button
                type="button"
                className={`w-8 h-8 mx-2 mb-2 rounded-full ${
                  ele + 1 === page ? 'bg-gray-light' : 'bg-gray-lightest'
                }`}
                onClick={() => handleClick(ele + 1)}
              >
                {ele + 1}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default PageNav

import React, { FunctionComponent } from 'react'

import { useRouter } from 'next/router'

import { useDispatch } from 'react-redux'

import ShadowButton from '@components/common/ShadowButton'
import { setNavSearch } from '@redux/clientSlice'
import { handleProductsSearch } from '@redux/productsSlice'

const NoItems: FunctionComponent = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleClick = () => {
    dispatch(setNavSearch(''))
    dispatch(handleProductsSearch(''))

    router
      .push('/products?page=1', '/products?page=1', { shallow: true })
      .then(() => window.scrollTo(0, 0))
  }

  return (
    <div className="flex flex-col items-center w-full my-10 mx-auto max-w-xl">
      <h3 className="text-3xl font-medium text-blue-dark">Hmm.....</h3>
      <p className="my-2">
        We couldn't find exactly what you were looking for. Try a different
        search term or explore our full wine list.
      </p>
      <div className="my-16">
        <ShadowButton text="Clear Filters and Search" fn={handleClick} />
      </div>
    </div>
  )
}

export default NoItems

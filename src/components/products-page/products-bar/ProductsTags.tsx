import React, { FunctionComponent } from 'react'

import { useRouter } from 'next/router'

import Close from '../../../assets/svgs/close-sm.svg'

const ProductsTags: FunctionComponent = () => {
  const router = useRouter()
  return (
    <div className="mb-6">
      <button
        type="button"
        className="flex justify-between items-center text-left text-blue-dark
        bg-lime shadow-blue-dark border-blue-dark text-base font-bold uppercase
        py-2 px-4 border"
        onClick={() => router.push('/products', '/products', { shallow: true })}
      >
        <span className="mr-4">Clear all tags</span>
        <Close className="w-4" />
      </button>
    </div>
  )
}

export default ProductsTags

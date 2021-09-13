import React, { FunctionComponent } from 'react'

import { useRouter } from 'next/router'

import Close from '../../../assets/svgs/close-rounded.svg'

interface Props {
  closeMobileMenu?: () => void
}

const ProductsTags: FunctionComponent<Props> = ({ closeMobileMenu }) => {
  const router = useRouter()
  return (
    <div className="flex justify-between mb-6">
      <button
        type="button"
        className="flex justify-between items-center text-left text-blue-dark
        bg-lime shadow-blue-dark border-blue-dark text-base font-bold uppercase
        py-2 px-4 border"
        onClick={() => router.push('/products', '/products', { shallow: true })}
      >
        <span className="mr-4">Clear all tags</span>
        <Close className="w-3" />
      </button>
      <button
        type="button"
        className="flex justify-center items-center w-10 h-10 rounded-full bg-lime lg:hidden"
        onClick={() => (closeMobileMenu ? closeMobileMenu() : null)}
      >
        <Close className="w-4 svg-close-position" />
      </button>
    </div>
  )
}

export default ProductsTags

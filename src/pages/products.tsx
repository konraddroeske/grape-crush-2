import React, { FunctionComponent } from 'react'

import { useRouter } from 'next/router'

const Products: FunctionComponent = () => {
  const router = useRouter()
  const { query } = router.query
  return (
    <div className="min-h-screen">
      <h1>Products page: {query}</h1>
    </div>
  )
}

export default Products

import React, {
  BaseSyntheticEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'

import debounce from 'lodash.debounce'
import { useDispatch, useSelector } from 'react-redux'

import Search from '@assets/svgs/search.svg'
import { selectClient, setNavSearch } from '@redux/clientSlice'
import { handleProductsSearch } from '@redux/productsSlice'

const ProductsSearch: FunctionComponent = () => {
  const dispatch = useDispatch()
  const { navSearch } = useSelector(selectClient())

  const [value, setValue] = useState<string>(navSearch || '')

  useEffect(() => {
    if (navSearch.length > 0) {
      dispatch(handleProductsSearch(navSearch))
    }
    dispatch(setNavSearch(''))
  }, [dispatch, navSearch])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((nextValue) => dispatch(handleProductsSearch(nextValue)), 300),
    []
  )

  const handleChange = (event: BaseSyntheticEvent) => {
    const { value: nextValue } = event.target
    setValue(nextValue)

    debouncedSearch(nextValue)
  }

  return (
    <div className="relative flex h-7 bg-lime-light">
      <input
        type="text"
        placeholder="Search"
        className="w-full border-none bg-transparent font-bold placeholder-transparent py-0 pr-8"
        value={value}
        onChange={handleChange}
      />
      <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5" />
    </div>
  )
}

export default ProductsSearch

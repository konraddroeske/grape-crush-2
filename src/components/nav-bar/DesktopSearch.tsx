import React, {
  BaseSyntheticEvent,
  FunctionComponent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import gsap from 'gsap'
import debounce from 'lodash.debounce'
import { useRouter } from 'next/router'

import { useDispatch, useSelector } from 'react-redux'

import { selectClient, setNavSearch } from '@redux/clientSlice'

import { selectGlobal } from '@redux/globalSlice'

import { handleProductsSearch } from '@redux/productsSlice'

import SearchIcon from '../../assets/svgs/search.svg'

interface Props {
  variant?: 'navBar' | 'productsBar'
}

const DesktopSearch: FunctionComponent<Props> = ({ variant = 'navBar' }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { navOpen } = useSelector(selectGlobal())
  const { navSearch } = useSelector(selectClient())

  const [expanded, setExpanded] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    if (navSearch.length > 0) {
      setSearch(navSearch)
      setExpanded(true)
      dispatch(handleProductsSearch(navSearch))
    } else {
      setSearch('')
    }

    return () => {
      setExpanded(false)
      setSearch('')

      if (variant === 'productsBar') {
        dispatch(setNavSearch(''))
      }
    }
  }, [variant, dispatch, navSearch])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((nextValue) => dispatch(handleProductsSearch(nextValue)), 300),
    []
  )

  const handleChange = (event: BaseSyntheticEvent) => {
    if (variant === 'navBar') setSearch(event.target.value)
    else {
      const { value: nextValue } = event.target
      setSearch(nextValue)
      debouncedSearch(nextValue)
    }
  }

  const handleClickNavBar = () => {
    if (!expanded && inputRef.current) {
      setExpanded(true)
    } else if (variant === 'navBar') handleRoute()
  }

  const handleClickProductsBar = () => {
    setExpanded(!expanded)
  }

  const handleRoute = () => {
    dispatch(setNavSearch(search))
    setSearch('')

    router
      .push('/products', '/products', {
        shallow: true,
      })
      .then(() => window.scrollTo(0, 0))
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    handleRoute()
  }

  const formRef = useRef<HTMLFormElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (navOpen && expanded) {
      gsap.set(formRef.current, {
        backgroundColor: '#dfff85',
      })
    } else if (navOpen && !expanded) {
      gsap.set(formRef.current, {
        backgroundColor: '#dfff85',
      })
    } else if (!navOpen && expanded) {
      gsap.set(formRef.current, {
        backgroundColor: '#f4f3f9',
      })
    } else {
      gsap.set(formRef.current, {
        backgroundColor: 'transparent',
      })
    }
  }, [navOpen, expanded])

  const variants = {
    navBar: {
      form: 'flex justify-center items-center h-8 rounded-full transition-all duration-300',
      width: '10rem',
    },
    productsBar: {
      form: 'flex w-full justify-end items-center h-8 rounded-full transition-all duration-300 sm:w-auto sm:justufy-center',
      width: 'calc(100% - 2rem - 1px)',
    },
  }

  return (
    <form
      ref={formRef}
      className={variants[variant].form}
      style={{
        backgroundColor: expanded ? '#f4f3f9' : 'transparent',
      }}
      onSubmit={(event) => {
        event.preventDefault()
        if (variant === 'navBar') {
          handleSubmit(event)
        }
      }}
    >
      <label htmlFor="searchField" className="sr-only">
        Search
      </label>
      <input
        ref={inputRef}
        id="searchField"
        type="text"
        placeholder="Search"
        className={`h-8 bg-transparent border-0 w-0 px-0 font-bold mr-px ${
          navOpen ? 'placeholder-blue-dark' : 'placeholder-blue-light'
        }
          text-blue-dark uppercase italic transition-all duration-300 pointer-events-auto`}
        value={search}
        onChange={handleChange}
        onBlur={() => setExpanded(false)}
        style={{
          width: expanded ? variants[variant].width : 0,
          paddingLeft: expanded ? '1rem' : 0,
        }}
      />
      <button
        ref={buttonRef}
        type="button"
        className={`w-8 h-8 ${
          navOpen ? 'bg-lime' : 'bg-blue-lightest'
        } rounded-full flex justify-center items-center pointer-events-auto transition-all duration-300`}
        onClick={
          variant === 'navBar' ? handleClickNavBar : handleClickProductsBar
        }
      >
        <SearchIcon className="w-6" />
      </button>
    </form>
  )
}

export default DesktopSearch

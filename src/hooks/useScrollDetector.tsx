import { RefObject, useCallback, useEffect, useRef, useState } from 'react'

const useScrollDetector = (
  element: RefObject<HTMLElement> | undefined = undefined
) => {
  const [isScrollUp, setIsScrollUp] = useState<boolean>(true)
  const oldValue = useRef<number>(0)
  const newValue = useRef<number>(0)

  const handleScroll = useCallback(() => {
    newValue.current = element?.current
      ? element.current.scrollTop
      : window.scrollY

    if (oldValue.current < newValue.current && isScrollUp) {
      setIsScrollUp(false)
    } else if (oldValue.current > newValue.current && !isScrollUp) {
      setIsScrollUp(true)
    }

    oldValue.current = newValue.current
  }, [element, isScrollUp])

  useEffect(() => {
    let curElement: HTMLElement | Window | undefined

    if (!element && window) {
      curElement = window
      window.addEventListener('scroll', handleScroll)
    } else if (element?.current) {
      curElement = element.current
      curElement.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (curElement) {
        curElement.removeEventListener('scroll', handleScroll)
      }
    }
  }, [element, handleScroll])

  return isScrollUp
}

export default useScrollDetector

import { RefObject, useCallback, useEffect, useRef, useState } from 'react'

const useScrollDetector = (
  element: RefObject<HTMLDivElement> | Window = window
) => {
  const [isScrollUp, setIsScrollUp] = useState<boolean>(true)
  const oldValue = useRef<number>(0)
  const newValue = useRef<number>(0)

  const handleScroll = useCallback(() => {
    newValue.current =
      element instanceof Window
        ? element.scrollY
        : element?.current?.scrollTop || 0

    if (oldValue.current < newValue.current && isScrollUp) {
      setIsScrollUp(false)
    } else if (oldValue.current > newValue.current && !isScrollUp) {
      setIsScrollUp(true)
    }

    oldValue.current = newValue.current
  }, [element, isScrollUp])

  useEffect(() => {
    const currentElement = element

    if (currentElement instanceof Window) {
      currentElement.addEventListener('scroll', handleScroll)
    } else if (currentElement?.current) {
      currentElement.current?.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (currentElement instanceof Window) {
        currentElement.removeEventListener('scroll', handleScroll)
      } else if (currentElement?.current) {
        currentElement.current?.removeEventListener('scroll', handleScroll)
      }
    }
  }, [element, handleScroll])

  return isScrollUp
}

export default useScrollDetector

import { useEffect, useRef } from 'react'

const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      savedCallback.current()
    }

    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }

    return () => null
  }, [delay])
}

export default useInterval

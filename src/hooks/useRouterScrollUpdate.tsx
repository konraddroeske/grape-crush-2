import { useEffect } from 'react'

import { useRouterScroll } from '@moxy/next-router-scroll'

const useRouterScrollUpdate = () => {
  const { updateScroll } = useRouterScroll()

  useEffect(() => {
    updateScroll()
  }, [updateScroll])
}

export default useRouterScrollUpdate

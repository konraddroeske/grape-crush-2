import React, { FunctionComponent, useEffect } from 'react'

import { useRouterScroll } from '@moxy/next-router-scroll'

interface OwnProps {
  children: React.ReactNode
}

type Props = OwnProps

const RouterScroll: FunctionComponent<Props> = ({ children }) => {
  const { updateScroll } = useRouterScroll()

  useEffect(() => {
    updateScroll()
  }, [updateScroll])

  return <>{children}</>
}

export default RouterScroll

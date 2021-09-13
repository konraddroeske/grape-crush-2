import React, { useRef, useEffect, useState, FunctionComponent } from 'react'

import { createPortal } from 'react-dom'

interface Props {
  children: React.ReactNode
  selector: string
}

const ClientOnlyPortal: FunctionComponent<Props> = ({ children, selector }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector(selector)
    setMounted(true)
  }, [selector])

  return mounted && ref.current ? createPortal(children, ref.current) : null
}

export default ClientOnlyPortal

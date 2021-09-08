import React, { FunctionComponent, useEffect, useState } from 'react'

import { useInView } from 'react-intersection-observer'

const AlternatingTitle: FunctionComponent = () => {
  const [currentTitle, setCurrentTitle] = useState<string>('Natural')
  const { ref, inView } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    const titles = [
      'Natural',
      'Organics',
      'Tasty',
      'Groovy',
      'Local',
      'Wild',
      'Crushable',
    ]

    let counter = 0

    const interval = setInterval(() => {
      if (!inView) {
        clearInterval(interval)
      } else if (counter > titles.length - 1) {
        counter = 0
        setCurrentTitle(titles[counter])
      } else {
        setCurrentTitle(titles[counter])
      }

      counter += 1
    }, 1000)

    return () => clearInterval(interval)
  }, [inView])

  return (
    <span ref={ref} className="text-lime">
      {currentTitle}
    </span>
  )
}

export default AlternatingTitle

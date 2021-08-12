import React, { FunctionComponent, useEffect, useState } from 'react'

const AlternatingTitle: FunctionComponent = () => {
  const [currentTitle, setCurrentTitle] = useState<string>('Natural')

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
      if (counter > titles.length - 1) {
        counter = 0
        setCurrentTitle(titles[counter])
      } else {
        setCurrentTitle(titles[counter])
      }

      counter += 1
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return <span className="text-lime text-9xl leading-30">{currentTitle}</span>
}

export default AlternatingTitle

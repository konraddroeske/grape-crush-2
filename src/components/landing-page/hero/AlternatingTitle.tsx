import React, { FunctionComponent, useEffect, useMemo, useState } from 'react'

import { useInView } from 'react-intersection-observer'

import AnimatedHeadline from '@components/common/AnimatedHeadline'
import useInterval from '@hooks/useInterval'

const AlternatingTitle: FunctionComponent = () => {
  const [currentTitle, setCurrentTitle] = useState<string>('Natural')
  const [count, setCount] = useState<number>(0)
  const { ref, inView } = useInView({
    threshold: 0,
  })

  // https://overreacted.io/making-setinterval-declarative-with-react-hooks/

  const titles = useMemo(
    () => [
      'Natural',
      'Organic',
      'Tasty',
      'Groovy',
      'Local',
      'Wild',
      'Crushable',
    ],
    []
  )

  useEffect(() => {
    if (inView) {
      setCurrentTitle(titles[count])
    }
  }, [inView, titles, count])

  useInterval(() => {
    if (count >= titles.length - 1) {
      setCount(0)
    } else {
      setCount(count + 1)
    }
  }, 5000)

  return (
    <span ref={ref} className="text-lime">
      <AnimatedHeadline
        text={currentTitle}
        textStyle="text-lime"
        yoyo
        repeat={1}
      />
    </span>
  )
}

export default AlternatingTitle

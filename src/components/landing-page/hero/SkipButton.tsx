import React, { FunctionComponent, useState } from 'react'

import Link from 'next/link'

import Arrow from '../../../assets/svgs/fat-arrow-right.svg'

const SkipButton: FunctionComponent = () => {
  const [hover, setHover] = useState<boolean>(false)

  return (
    <Link href="/products">
      <a>
        <div
          className="flex items-center"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div
            className="h-9 overflow-hidden uppercase text-lime
          text-xl px-2 font-bold"
          >
            <div
              className={`flex flex-col transition-all duration-300 ${
                hover ? 'transform -translate-y-1/2' : ''
              }`}
            >
              <div className="h-9 flex items-center">Skip To Wines</div>
              <div className="h-9 flex items-center">Skip To Wines</div>
            </div>
          </div>
          <div className="w-14">
            <Arrow className="w-full svg-lime-stroke" />
          </div>
        </div>
      </a>
    </Link>
  )
}

export default SkipButton

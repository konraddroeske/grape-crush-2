import React, { FunctionComponent, useState } from 'react'

import ShadowButton from '@components/common/ShadowButton'

const HeroModal: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed z-50 bottom-0 left-0 right-0 w-full bg-lime p-6
          sm:absolute sm:bottom-6 sm:right-6 sm:left-auto sm:shadow-blue-dark-lg sm:w-96"
        >
          <h3
            className="text-center font-bold uppercase text-5xl text-transparent
          text-stroke-blue-thin"
          >
            Hold On
          </h3>
          <p className="text-blue-dark mt-2 mb-3">
            By continuing you confirm you are 19+ years of age and legally able
            to buy and consume alcohol.
          </p>
          <div className="flex justify-center">
            <ShadowButton text="Okay!" fn={handleClose} />
          </div>
        </div>
      )}
    </>
  )
}

export default HeroModal

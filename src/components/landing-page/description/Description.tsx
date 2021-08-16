import React, { FunctionComponent } from 'react'

import ShadowButton from '@components/common/ShadowButton'

const Description: FunctionComponent = () => {
  return (
    <section
      className="flex body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl
    pt-8 pb-12"
    >
      <div className="w-1/2 pr-8">
        <h2 className="flex flex-col text-6xl text-blue-dark font-bold uppercase">
          <span>Find your</span>
          <span>next grape</span>
          <span>crush</span>
        </h2>
      </div>
      <div className="w-1/2 pt-20">
        <p className="font-headline text-blue-dark text-xl font-medium">
          We work with some of our favourite sommeliers and local{' '}
          <span className="bg-lime">wine enthusiasts</span> to bring you a
          curated selection of natural, biodynamic and classic wines.
        </p>
        {/* <button type="button">Learn More</button> */}
        <div className="my-4">
          <ShadowButton text="Learn more" />
        </div>
      </div>
    </section>
  )
}

export default Description

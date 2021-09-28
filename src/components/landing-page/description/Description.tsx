import React, { FunctionComponent } from 'react'

import Link from 'next/link'

import ShadowLink from '@components/common/ShadowLink'

const Description: FunctionComponent = () => {
  return (
    <section
      className="flex flex-col lg:flex-row body-gutter-sm lg:body-gutter-lg
      xl:body-gutter-xl pt-6 lg:pt-12 2xl:pt-24"
    >
      <div className="w-full lg:w-1/2 lg:pr-8">
        <h2
          className="flex flex-col text-4xl xs:text-5xl sm:text-6xl text-blue-dark font-bold
        uppercase xl:text-7xl 2xl:text-8xl"
        >
          <span>Find your</span>
          <span>next grape</span>
          <span>crush</span>
        </h2>
      </div>
      <div className="pt-4 lg:flex lg:flex-col lg:justify-center w-full lg:w-1/2">
        <p
          id="description-text"
          className="font-headline text-blue-dark text-base sm:text-xl font-medium
        xl:text-2xl 2xl:text-3xl"
        >
          We work with some of our favourite sommeliers and local{' '}
          <span className="bg-lime">wine enthusiasts</span> to bring you a
          curated selection of natural, biodynamic and classic wines.
        </p>
        <div className="my-4 xl:my-6 2xl:my-8 flex">
          <Link href="/products">
            <a>
              <ShadowLink>Shop All Wines</ShadowLink>
            </a>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Description

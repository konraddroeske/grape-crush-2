import React, { FunctionComponent } from 'react'

import Link from 'next/link'

import AnimatedText from '@components/common/AnimatedText'
import ShadowLink from '@components/common/ShadowLink'

const Description: FunctionComponent = () => {
  return (
    <section
      className="flex flex-col lg:flex-row body-gutter-sm lg:body-gutter-lg
      xl:body-gutter-xl pt-6 lg:pt-12 2xl:pt-24"
    >
      <div className="w-full lg:w-1/2 lg:pr-8">
        <AnimatedText
          textStyles="flex flex-col text-4xl xs:text-5xl sm:text-6xl text-blue-dark font-bold
        uppercase xl:text-7xl 2xl:text-8xl"
          blockType="h2"
        >
          <span className="block">Find your</span>
          <span className="block">next grape</span>
          <span className="block">crush</span>
        </AnimatedText>
      </div>
      <div className="pt-4 lg:flex lg:flex-col lg:justify-center w-full lg:w-1/2">
        <AnimatedText textStyles="font-headline text-blue-dark text-base sm:text-xl font-medium xl:text-2xl 2xl:text-3xl">
          With one of Ontario's largest natural wines selection, shop{' '}
          <span className="bg-lime">from over 200+</span> natural, biodynamic
          and classic wines for any budget.
        </AnimatedText>
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

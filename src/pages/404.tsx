import React, { FunctionComponent } from 'react'

import Link from 'next/link'

import OutlineMarquee from '@components/common/OutlineMarquee'
import Seo from '@components/common/Seo'
import Warning from '@components/common/Warning'
import useRouterScrollUpdate from '@hooks/useRouterScrollUpdate'
import fetchGlobalData from '@lib/fetchGlobalData'

import { wrapper } from '@redux/store'

const Custom404: FunctionComponent = () => {
  useRouterScrollUpdate()

  return (
    <>
      <Seo title="404" canonical="https://www.grapecrush.wine/404" />
      <div className="min-h-screen pt-12 flex flex-col justify-between">
        <div id="location" className="mt-4 overflow-hidden">
          <OutlineMarquee text="Oops!" />
        </div>
        <div className="body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl">
          <Warning text="404">
            <p className="font-headline relative z-10 my-4">
              <span className="block">
                We can't find what you were looking&nbsp;for.
              </span>
              <span className="block">
                Take a look at{' '}
                <span className="underline">
                  <Link href="/products?page=1">
                    <a>our wines</a>
                  </Link>
                </span>{' '}
                and maybe you'll find it there.
              </span>
            </p>
          </Warning>
        </div>
        <div id="contact" className="mb-4 overflow-hidden">
          <OutlineMarquee text="Oops!" direction="-=" />
        </div>
      </div>
    </>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  await fetchGlobalData(store)

  return {
    props: {},
    revalidate: 60,
  }
})

export default Custom404

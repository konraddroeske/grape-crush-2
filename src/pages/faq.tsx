import React, { FunctionComponent, useEffect, useState } from 'react'

import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'

import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { useSelector } from 'react-redux'

import OutlineMarquee from '@components/common/OutlineMarquee'
import Seo from '@components/common/Seo'
import ShadowLink from '@components/common/ShadowLink'
import fetchFaqData from '@lib/fetchFaqData'
import fetchGlobalData from '@lib/fetchGlobalData'
import { IFaqFields } from '@models/contentful-graph'
import { selectFaq, setQuestions } from '@redux/faqSlice'
import {
  setFooter,
  setHeroSlides,
  setLocale,
  setNav,
  setPages,
} from '@redux/globalSlice'
import { setAllTags, setCategories } from '@redux/productsSlice'
import { wrapper } from '@redux/store'

const Faq: FunctionComponent = () => {
  const router = useRouter()
  const { questions } = useSelector(selectFaq())

  const [sortedQuestions, setSortedQuestions] = useState<IFaqFields[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin)
    const path = router.asPath
    const position = path.indexOf('#')
    const anchor = position !== -1 ? path.slice(position) : null

    if (anchor) {
      gsap.to(window, 0.3, { scrollTo: { y: anchor, offsetY: 70 } })
    }
  }, [router])

  useEffect(() => {
    if (questions) {
      const sorted = [...questions]
        .sort((a, b) => {
          const dateA = new Date(a.published)
          const dateB = new Date(b.published)

          return dateB.getTime() - dateA.getTime()
        })
        .filter((ele) => ele.anchor)

      setSortedQuestions(sorted)
    }
  }, [questions])

  return (
    <>
      <Seo title="FAQ" />
      <div className="min-h-screen py-12">
        <div className="my-4 overflow-hidden">
          <OutlineMarquee text="Frequently asked questions" />
        </div>
        <div className="body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl max-w-screen-xl mx-auto">
          <ul className="">
            {sortedQuestions.length > 0 &&
              sortedQuestions.map((item) => {
                const { question, answer, anchor } = item
                return (
                  <li
                    key={anchor}
                    id={anchor}
                    className="py-6 border-b-4 border-lime last:border-b-0"
                  >
                    <h3 className="text-2xl text-blue-dark font-medium mb-2">
                      {question}
                    </h3>
                    <p>{answer}</p>
                  </li>
                )
              })}
          </ul>
          <div className="flex justify-center mt-6" id="shop">
            <Link href="/products">
              <a>
                <ShadowLink>Ready to shop?</ShadowLink>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const {
    products,
    locale,
    heroSlideCollection,
    pageCollection,
    footerCollection,
    navCollection,
    categoryCollection,
  } = await fetchGlobalData()

  // Global
  store.dispatch(setAllTags(products))
  store.dispatch(setLocale(locale))
  store.dispatch(setPages(pageCollection))
  store.dispatch(setCategories(categoryCollection))
  store.dispatch(setFooter(footerCollection))
  store.dispatch(setNav(navCollection))
  store.dispatch(setHeroSlides(heroSlideCollection))

  const { faqCollection } = await fetchFaqData()

  // Products
  store.dispatch(setQuestions(faqCollection))

  return {
    props: {},
    revalidate: 60,
  }
})

export default Faq

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
import { IFaqFields } from '@models/contentful'
import { selectFaq, setQuestions } from '@redux/faqSlice'
import {
  selectGlobal,
  setFooter,
  setHeroSlides,
  setLocale,
  setNav,
  setPages,
} from '@redux/globalSlice'
import { setAllTags, setCategories } from '@redux/productsSlice'
import { wrapper } from '@redux/store'

const Faq: FunctionComponent = () => {
  const { locale } = useSelector(selectGlobal())
  const router = useRouter()
  const { questions } = useSelector(selectFaq())

  const [sortedQuestions, setSortedQuestions] = useState<IFaqFields[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin)
    const path = router.asPath
    const anchor = path.slice(path.indexOf('#'))

    if (anchor) {
      gsap.to(window, 0.3, { scrollTo: { y: anchor, offsetY: 70 } })
    }
  }, [router])

  useEffect(() => {
    if (questions) {
      const sorted = [...questions]
        .sort((a, b) => {
          const dateA = new Date(a.published[locale])
          const dateB = new Date(b.published[locale])

          return dateB.getTime() - dateA.getTime()
        })
        .filter((ele) => ele.anchor)

      setSortedQuestions(sorted)
    }
  }, [questions, locale])

  return (
    <>
      <Seo title="FAQ" />
      <div className="min-h-screen py-12">
        <div className="my-4 overflow-hidden">
          <OutlineMarquee text="Frequently asked questions" />
        </div>
        <div className="body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl">
          <ul className="">
            {sortedQuestions.length > 0 &&
              sortedQuestions.map((item) => {
                const { question, answer, anchor } = item
                return (
                  <li
                    key={anchor[locale]}
                    id={anchor[locale]}
                    className="py-6 border-b-4 border-lime last:border-b-0"
                  >
                    <h3 className="text-2xl text-blue-dark font-medium mb-2">
                      {question[locale]}
                    </h3>
                    <p>{answer[locale]}</p>
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
    heroAssets,
    pageAssets,
    categoryAssets,
    footerAssets,
    navAssets,
  } = await fetchGlobalData()

  const { faqAssets } = await fetchFaqData()

  // Global
  store.dispatch(setAllTags(products))
  store.dispatch(setLocale(locale))
  store.dispatch(setPages(pageAssets))
  store.dispatch(setCategories(categoryAssets))
  store.dispatch(setFooter(footerAssets))
  store.dispatch(setNav(navAssets))
  store.dispatch(setHeroSlides(heroAssets))

  // Products
  store.dispatch(setQuestions(faqAssets))

  return {
    props: {},
  }
})

export default Faq

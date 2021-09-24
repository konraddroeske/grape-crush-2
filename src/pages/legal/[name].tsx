import React, { FunctionComponent, useEffect, useState } from 'react'

import { Options } from '@contentful/rich-text-react-renderer'
import { BLOCKS, Document } from '@contentful/rich-text-types'
import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import ContentfulRichText from '@components/common/ContentfulRichText'
import OutlineMarquee from '@components/common/OutlineMarquee'
import Seo from '@components/common/Seo'
import fetchGlobalData from '@lib/fetchGlobalData'
import fetchPageData from '@lib/fetchPageData'
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

const LegalPage: FunctionComponent = () => {
  const router = useRouter()
  const { allPages, locale } = useSelector(selectGlobal())
  const { name } = router.query

  const [title, setTitle] = useState<string | null>(null)
  const [document, setDocument] = useState<Document | null>(null)

  useEffect(() => {
    const currentPage = allPages.find((ele) => ele.slug[locale] === name)

    setDocument(currentPage?.content?.[locale] || null)
    setTitle(currentPage?.title?.[locale] || null)
  }, [name, allPages, locale])

  const options: Options = {
    // renderMark: {
    //   [MARKS.BOLD]: (text) => (
    //     <span className="inline-block bg-lime">{text}</span>
    //   ),
    // },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="text-base mb-4">{children}</p>
      ),
    },
  }

  return (
    <>
      <Seo title={title || 'Wines Within Reach'} />
      <div className="min-h-screen py-12">
        {title && (
          <div className="my-4 overflow-hidden">
            <OutlineMarquee text={title || 'Legal Page'} />
          </div>
        )}
        <div className="py-6 body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl">
          {document && (
            <ContentfulRichText options={options} richText={document} />
          )}
        </div>
      </div>
    </>
  )
}

export const getStaticPaths = async () => {
  const { pageAssets, locale } = await fetchPageData()

  const paths = pageAssets.map((page) => {
    return {
      params: {
        name: page.slug[locale],
      },
    }
  })
  return { paths, fallback: false }
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const {
    products,
    locale,
    pageAssets,
    heroAssets,
    categoryAssets,
    footerAssets,
    navAssets,
  } = await fetchGlobalData()

  // Global
  store.dispatch(setAllTags(products))
  store.dispatch(setLocale(locale))
  store.dispatch(setPages(pageAssets))
  store.dispatch(setCategories(categoryAssets))
  store.dispatch(setFooter(footerAssets))
  store.dispatch(setNav(navAssets))
  store.dispatch(setHeroSlides(heroAssets))

  return {
    props: {},
    revalidate: 60,
  }
})

export default LegalPage

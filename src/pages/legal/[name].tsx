import React, { FunctionComponent, useEffect, useState } from 'react'

import { Options } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import ContentfulRichText from '@components/common/ContentfulRichText'
import OutlineMarquee from '@components/common/OutlineMarquee'
import { CmsAssets } from '@lib/cms'
import fetchGlobalData from '@lib/fetchGlobalData'
import fetchPageData from '@lib/fetchPageData'
import {
  selectGlobal,
  setFooter,
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

  const [pageData, setPageData] = useState<CmsAssets | null>(null)

  useEffect(() => {
    const currentPage = allPages.find((ele) => ele.slug[locale] === name)

    if (currentPage) {
      setPageData(currentPage)
    }
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
    <div className="min-h-screen py-12">
      {pageData?.title[locale] && (
        <div className="my-4 overflow-hidden">
          <OutlineMarquee text={pageData.title[locale] || 'Legal Page'} />
        </div>
      )}
      <div className="py-6 body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl">
        {pageData?.content[locale] && (
          <ContentfulRichText
            options={options}
            richText={pageData.content[locale]}
          />
        )}
      </div>
    </div>
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

  return {
    props: {},
  }
})

export default LegalPage

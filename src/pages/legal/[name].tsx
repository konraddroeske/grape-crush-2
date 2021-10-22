import React, { FunctionComponent, useEffect, useState } from 'react'

import { Options } from '@contentful/rich-text-react-renderer'
import { BLOCKS, Document, INLINES, MARKS } from '@contentful/rich-text-types'
import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import ContentfulRichText from '@components/common/ContentfulRichText'
import OutlineMarquee from '@components/common/OutlineMarquee'
import Seo from '@components/common/Seo'
import useRouterScrollUpdate from '@hooks/useRouterScrollUpdate'
import fetchGlobalData from '@lib/fetchGlobalData'
import fetchPageData from '@lib/fetchPageData'
import { IPageFields } from '@models/contentful-graph'
import { selectGlobal } from '@redux/globalSlice'
import { wrapper } from '@redux/store'

const LegalPage: FunctionComponent = () => {
  useRouterScrollUpdate()
  const router = useRouter()
  const { allPages } = useSelector(selectGlobal())
  const { name } = router.query

  // console.log('all pages', allPages)

  const [title, setTitle] = useState<string | null>(null)
  const [document, setDocument] = useState<Document | null>(null)

  useEffect(() => {
    const currentPage = allPages.find((ele) => ele.slug === name)

    setDocument(currentPage?.content?.json || null)
    setTitle(currentPage?.title || null)
  }, [name, allPages])

  const options: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <span className="font-bold">{text}</span>,
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => (
        <h1 className="text-2xl mb-4 text-blue-dark font-bold">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 className="text-xl mb-4 text-blue-dark font-bold">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <h3 className="text-lg mb-4 text-blue-dark font-bold">{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <h4 className="text-base mb-4 text-blue-dark font-bold">{children}</h4>
      ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="text-base mb-4">{children}</p>
      ),
      [BLOCKS.UL_LIST]: (node, children) => (
        <ul className="text-base mb-4">{children}</ul>
      ),
      [BLOCKS.LIST_ITEM]: (node, children) => (
        <li className="list-disc list-outside text-base ml-8">{children}</li>
      ),
      [INLINES.HYPERLINK]: (node, children) => (
        <a
          className="font-bold dont-break-out"
          href={`${children}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
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
        <div
          className="py-6 body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl
        2xl:body-gutter-2xl max-w-screen-xl mx-auto"
        >
          {document && (
            <ContentfulRichText options={options} richText={document} />
          )}
        </div>
      </div>
    </>
  )
}

export const getStaticPaths = async () => {
  const { pageCollection } = await fetchPageData()
  const { items }: { items: IPageFields[] } = pageCollection

  const paths = items.map((page) => {
    return {
      params: {
        name: page.slug,
      },
    }
  })
  return { paths, fallback: false }
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  await fetchGlobalData(store)

  return {
    props: {},
    revalidate: 60,
  }
})

export default LegalPage

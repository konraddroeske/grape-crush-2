import React, { FunctionComponent } from 'react'

import fetchGlobalData from '@lib/fetchGlobalData'
import { setFooter, setLocale, setNav, setPages } from '@redux/globalSlice'
import { setAllTags, setCategories } from '@redux/productsSlice'
import { wrapper } from '@redux/store'

import Star from '../assets/svgs/star.svg'

const about: FunctionComponent = () => {
  return (
    <div>
      {/* <h1></h1> */}
      <Star />
    </div>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  // const { locale: defaultLocale = 'en-US' } = ctx
  // console.log('store', store.getState())

  const {
    products,
    locale,
    pageAssets,
    // igImages,
    categoryAssets,
    // categories,
    footerAssets,
    navAssets,
  } = await fetchGlobalData()

  // const { faqAssets } = await fetchFaqData()
  // console.log(faqAssets)

  // Global
  store.dispatch(setAllTags(products))
  store.dispatch(setLocale(locale))
  store.dispatch(setPages(pageAssets))
  store.dispatch(setCategories(categoryAssets))
  // store.dispatch(setIgImages(igImages))
  store.dispatch(setFooter(footerAssets))
  store.dispatch(setNav(navAssets))

  // About
  // store.dispatch(setQuestions(faqAssets))

  return {
    props: {},
  }
})

export default about

import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import TeamMembers from '@components/about/TeamMembers'
import ContentfulImage from '@components/common/ContentfulImage'
import ContentfulRichText from '@components/common/ContentfulRichText'
import OutlineMarquee from '@components/common/OutlineMarquee'
import fetchAboutData from '@lib/fetchAboutData'
import fetchGlobalData from '@lib/fetchGlobalData'
import { selectAbout, setFields, setTeamMembers } from '@redux/aboutSlice'
import {
  selectGlobal,
  setFooter,
  setLocale,
  setNav,
  setPages,
} from '@redux/globalSlice'
import { setAllTags, setCategories } from '@redux/productsSlice'
import { wrapper } from '@redux/store'

import AboutWaveMobile from '../assets/svgs/about-wave-mobile.svg'

import Star from '../assets/svgs/star.svg'

const About: FunctionComponent = () => {
  const { locale } = useSelector(selectGlobal())
  const { fields } = useSelector(selectAbout())

  if (!fields)
    return (
      <div>
        <h1>Not loaded.</h1>
      </div>
    )

  const { headline, image1, image2, paragraph1, paragraph2 } = fields

  return (
    <div className="min-h-screen pt-24">
      {headline && (
        <section className="relative body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl">
          <h1 className="relative z-10 uppercase text-4xl text-blue-dark font-bold mb-36">
            {headline[locale]}
          </h1>
          <Star className="w-60 absolute bottom-0 right-0 transform translate-y-1/2" />
        </section>
      )}
      <section className="body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl">
        <div className="my-4">
          <ContentfulImage image={image1} />
        </div>
        {paragraph1 && (
          <div className="my-4">
            <ContentfulRichText richText={paragraph1[locale]} />
          </div>
        )}
      </section>
      <div className="my-10 overflow-hidden">
        <OutlineMarquee text="Wines within reach" />
      </div>
      <section className="body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl">
        <div className="my-4">
          <ContentfulImage image={image2} />
        </div>
        {paragraph2 && (
          <div className="my-4">
            <ContentfulRichText richText={paragraph2[locale]} />
          </div>
        )}
      </section>
      <section className="relative mt-20 pb-10 bg-lime">
        <AboutWaveMobile className="absolute bottom-full left-0 right-0 w-full transform translate-y-px" />
        <TeamMembers />
      </section>
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
    footerAssets,
    navAssets,
  } = await fetchGlobalData()

  const { aboutAssets, teamMemberAssets } = await fetchAboutData()

  // Global
  store.dispatch(setAllTags(products))
  store.dispatch(setLocale(locale))
  store.dispatch(setPages(pageAssets))
  store.dispatch(setCategories(categoryAssets))
  // store.dispatch(setIgImages(igImages))
  store.dispatch(setFooter(footerAssets))
  store.dispatch(setNav(navAssets))

  // About
  store.dispatch(setFields(aboutAssets))
  store.dispatch(setTeamMembers(teamMemberAssets))

  return {
    props: {},
  }
})

export default About

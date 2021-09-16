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

import AboutSwirl from '../assets/svgs/about-swirl.svg'

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
          <h1
            className="relative z-10 uppercase text-4xl text-blue-dark font-bold mb-36
          xs:text-5xl sm:text-6xl lg:text-7xl lg:w-9/12 lg:pt-28 xl:text-8xl 2xl:text-9xl"
          >
            {headline[locale]}
          </h1>
          <Star
            className="w-60 absolute bottom-0 right-0 transform translate-y-1/2
          lg:w-4/12 lg:bottom-auto lg:top-0 lg:translate-y-0 lg:right-12 xl:right-24
          2xl:right-32"
          />
        </section>
      )}

      <section
        className="body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl
      2xl:body-gutter-2xl sm:grid grid-cols-2 gap-16"
      >
        <div className="my-4 sm:my-0">
          <ContentfulImage image={image1} containerStyles="max-h-70vh" />
        </div>
        {paragraph1 && (
          <div className="my-4 flex items-center sm:my-0">
            <ContentfulRichText richText={paragraph1[locale]} />
          </div>
        )}
      </section>

      <div className="my-10 overflow-hidden lg:my-12 xl:my-16 2xl:my-20">
        <OutlineMarquee text="Wines within reach" />
      </div>

      <section
        className="body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl
      2xl:body-gutter-2xl sm:grid grid-cols-2 gap-16"
      >
        <div className="my-4 sm:my-0 sm:grid-col-2">
          <ContentfulImage image={image2} containerStyles="max-h-70vh" />
        </div>
        {paragraph2 && (
          <div className="my-4 flex items-center sm:my-0 sm:grid-col-1 sm:grid-row-1">
            <div className="relative">
              <ContentfulRichText richText={paragraph2[locale]} />
              <AboutSwirl
                className="absolute bottom-0 transform translate-y-3/4
              left-1/2 w-1/2"
              />
            </div>
          </div>
        )}
      </section>

      <section
        className="relative mt-20 pb-10 bg-lime lg:bg-white
      lg:team-members-bg sm:mt-40 lg:pb-12 xl:pb-16 2xl:pb-20"
      >
        <AboutWaveMobile
          className="absolute bottom-full left-0 right-0 w-full
        transform translate-y-px lg:translate-y-0 lg:bottom-7/12"
        />
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

import React, { FunctionComponent } from 'react'

import { Options } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { useSelector } from 'react-redux'

import TeamMembers from '@components/about-page/TeamMembers'
import AnimatedText from '@components/common/AnimatedText'
import ContentfulImage from '@components/common/ContentfulImage'
import ContentfulRichText from '@components/common/ContentfulRichText'
import OutlineMarquee from '@components/common/OutlineMarquee'
import RouterScroll from '@components/common/RouterScroll'
import Seo from '@components/common/Seo'
import fetchAboutData from '@lib/fetchAboutData'
import fetchGlobalData from '@lib/fetchGlobalData'
import { selectAbout, setFields, setTeamMembers } from '@redux/aboutSlice'
import {
  setFooter,
  setHeroSlides,
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
  // const { locale } = useSelector(selectGlobal())
  const { fields } = useSelector(selectAbout())

  if (!fields)
    return (
      <div>
        <h1>Not loaded.</h1>
      </div>
    )

  const { headline, image1, image2, paragraph1, paragraph2 } = fields

  const options: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => (
        <span className="bg-lime whitespace-nowrap">{text}</span>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <AnimatedText
          blockType="p"
          textStyles="font-headline font-medium text-base text-blue-dark my-4
        xs:text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"
        >
          {children}
        </AnimatedText>
      ),
    },
  }

  return (
    <>
      <Seo title="About" />
      <RouterScroll>
        <div className="min-h-screen pt-24">
          {headline && (
            <section className="relative body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl">
              <AnimatedText
                blockType="h1"
                textStyles="relative z-10 uppercase text-4xl text-blue-dark font-bold mb-36
          xs:text-5xl sm:text-6xl lg:text-7xl lg:w-9/12 lg:pt-28 xl:text-8xl 2xl:text-9xl"
              >
                {headline}
              </AnimatedText>
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
                <ContentfulRichText
                  options={options}
                  richText={paragraph1.json}
                />
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
              <a
                href="https://nowtoronto.pressreader.com/now-magazine/20210318"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ContentfulImage image={image2} containerStyles="max-h-70vh" />
              </a>
            </div>
            {paragraph2 && (
              <div className="my-4 flex items-center sm:my-0 sm:grid-col-1 sm:grid-row-1">
                <div className="relative w-full">
                  <ContentfulRichText
                    options={options}
                    richText={paragraph2.json}
                  />
                  <AboutSwirl
                    className="hidden sm:block absolute bottom-0 transform translate-y-3/4
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
        transform translate-y-px lg:translate-y-0 lg:bottom-8/12"
            />
            <TeamMembers />
          </section>
        </div>
      </RouterScroll>
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

  const { aboutCollection, teamMembersCollection } = await fetchAboutData()

  // About
  store.dispatch(setFields(aboutCollection))
  store.dispatch(setTeamMembers(teamMembersCollection))

  return {
    props: {},
    revalidate: 60,
  }
})

export default About

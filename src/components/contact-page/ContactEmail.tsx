import React, { FunctionComponent } from 'react'

import { Options } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { useSelector } from 'react-redux'

import ContentfulImage from '@components/common/ContentfulImage'
import ContentfulRichText from '@components/common/ContentfulRichText'

import { selectContact } from '@redux/contactSlice'
import { selectGlobal } from '@redux/globalSlice'

import ContactWave from '../../assets/svgs/contact-wave-lime.svg'

const ContactEmail: FunctionComponent = () => {
  const { locale } = useSelector(selectGlobal())
  const { fields } = useSelector(selectContact())

  if (!fields)
    return (
      <div>
        <h1>Not loaded.</h1>
      </div>
    )

  const { contact, image } = fields

  const contactOptions: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => (
        <span className="inline-block bg-lime">{text}</span>
      ),
    },
    renderNode: {
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2
          className="uppercase text-4xl font-bold text-center text-blue-dark mb-2
        xs:text-5xl sm:text-left sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl"
        >
          {children}
        </h2>
      ),
    },
  }
  return (
    <section
      id="contact-email"
      className="relative pt-8 pb-24 lg:pb-28 xl:pt-12 xl:pb-32 2xl:pt-16 2xl:pb-36 overflow-hidden"
    >
      <div className="body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl sm:flex">
        <div className="relative z-10 sm:w-1/2 sm:flex sm:items-center">
          <ContentfulRichText
            richText={contact[locale]}
            options={contactOptions}
          />
        </div>
        <div className="-mt-6 sm:w-1/2 sm:mt-0">
          <ContentfulImage image={image} containerStyles="max-h-70vh" />
        </div>
      </div>
      <ContactWave className="absolute bottom-0 left-1/2 w-full min-w-200 transform -translate-x-1/2" />
    </section>
  )
}

export default ContactEmail

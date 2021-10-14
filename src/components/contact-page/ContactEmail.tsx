import React, { FunctionComponent } from 'react'

import { Options } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { useSelector } from 'react-redux'

import AnimatedText from '@components/common/AnimatedText'
import ContentfulImage from '@components/common/ContentfulImage'
import ContentfulRichText from '@components/common/ContentfulRichText'

import { selectContact } from '@redux/contactSlice'

import ContactWave from '../../assets/svgs/contact-wave-lime.svg'

const ContactEmail: FunctionComponent = () => {
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
      [MARKS.BOLD]: (text) => <span className="bg-lime">{text}</span>,
    },
    renderNode: {
      [BLOCKS.HEADING_2]: (node, children) => (
        <AnimatedText
          blockType="h2"
          textStyles="uppercase text-4xl font-bold text-center text-blue-dark mb-1
        xs:text-5xl sm:text-left sm:text-5xl lg:text-6xl xl:text-6xl 2xl:text-8xl"
        >
          {children}
        </AnimatedText>
      ),
      [BLOCKS.PARAGRAPH]: () => (
        <div className="my-6 lg:my-8 xl:my-8 2xl:my-10 opacity-0" />
      ),
    },
  }
  return (
    <section
      id="contact-email"
      className="relative pt-8 pb-24 lg:pb-28 xl:pt-12 xl:pb-32 2xl:pt-16 2xl:pb-36 overflow-hidden"
    >
      <div className="body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl sm:flex max-w-screen-2xl mx-auto">
        <div className="relative z-10 sm:w-1/3 sm:flex sm:items-center">
          <ContentfulRichText
            richText={contact.json}
            options={contactOptions}
          />
        </div>
        <div className="-mt-11 sm:w-2/3 sm:mt-0">
          <ContentfulImage image={image} containerStyles="max-h-70vh" />
        </div>
      </div>
      <ContactWave className="absolute bottom-0 left-1/2 w-full min-w-200 transform -translate-x-1/2" />
    </section>
  )
}

export default ContactEmail

import React, { FunctionComponent } from 'react'

import { Options } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import { useSelector } from 'react-redux'

import Sticker1 from '@assets/svgs/contact-sticker-1.svg'
import Sticker2 from '@assets/svgs/contact-sticker-2.svg'
import ContactSwirl from '@assets/svgs/contact-swirl.svg'
import ContentfulRichText from '@components/common/ContentfulRichText'
import ContactTitle from '@components/contact-page/ContactTitle'
import SimpleMap from '@components/contact-page/SimpleMap'

import { selectContact } from '@redux/contactSlice'
import { selectGlobal } from '@redux/globalSlice'

const ContactInfo: FunctionComponent = () => {
  const { locale } = useSelector(selectGlobal())
  const { fields } = useSelector(selectContact())

  if (!fields)
    return (
      <div>
        <h1>Not loaded.</h1>
      </div>
    )

  const { address, hours } = fields

  const locationOptions: Options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className="font-headline text-base text-black xs:text-base sm:text-lg lg:text-xl xl:text-xl 2xl:text-2xl">
          {children}
          <br />
        </p>
      ),
    },
  }

  return (
    <section
      id="contact-location"
      className="contact-padding body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl overflow-hidden"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-8 lg:gap-y-10 xl:gap-y-16">
        <div className="text-center my-4 sm:grid-col-1 sm:grid-row-1 sm:my-0">
          <ContactTitle>Visit Us</ContactTitle>
          <div className="relative">
            <ContentfulRichText
              richText={address[locale]}
              options={locationOptions}
            />
            <ContactSwirl className="contact-swirl-position" />
          </div>
        </div>
        <div className="relative my-4 sm:col-span-3 sm:my-0">
          <SimpleMap />
          <Sticker1 className="absolute w-32 xl:w-40 2xl:w-48 right-0 top-1/4 transform translate-x-1/3 -translate-y-1/2" />
          <Sticker2 className="absolute w-32 xl:w-40 2xl:w-48 left-0 bottom-1/4 transform -translate-x-1/3 translate-y-1/2" />
        </div>
        <div className="text-center my-4 sm:grid-col-2 sm:grid-row-1 sm:my-0">
          <ContactTitle>Retail Hours</ContactTitle>
          <ContentfulRichText
            richText={hours[locale]}
            options={locationOptions}
          />
        </div>
        <div className="text-center my-4 sm:grid-col-3 sm:grid-row-1 sm:my-0">
          <ContactTitle>Lurk Online</ContactTitle>
          <div className="font-headline text-base text-black xs:text-base sm:text-lg lg:text-xl xl:text-xl 2xl:text-2xl">
            <a
              href="https://www.instagram.com/grapecrush.wine"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
          <div className="font-headline text-base text-black xs:text-base sm:text-lg lg:text-xl xl:text-xl 2xl:text-2xl">
            <a
              href="https://www.facebook.com/grapecrush.wine"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactInfo

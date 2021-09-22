import React, { FC } from 'react'

import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'

import '../styles/tailwind.scss'
import Layout from '@components/layout/Layout'
import { wrapper } from '@redux/store'

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <Layout>
    <DefaultSeo
      titleTemplate="Grape Crush Wines | %s"
      additionalLinkTags={[
        {
          rel: 'icon',
          href: '/favicon.ico',
        },
      ]}
      openGraph={{
        type: 'website',
        locale: 'en_US',
        url: 'https://www.grapecrush.wine/',
        site_name: 'Grape Crush Wines',
        title: 'Grape Crush Wines',
        description:
          'Hundreds of natural, organic, and classic wines at great prices.',
      }}
      twitter={{
        cardType: 'summary_large_image',
      }}
    />
    <Component {...pageProps} />
  </Layout>
)

export default wrapper.withRedux(App)

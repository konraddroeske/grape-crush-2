import React, { FC, useEffect } from 'react'

import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'

import '../styles/tailwind.scss'
import { useRouter } from 'next/dist/client/router'
import Script from 'next/script'

import Layout from '@components/layout/Layout'
import { GA_TRACKING_ID, gaPageview } from '@lib/gTag'
import { wrapper } from '@redux/store'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gaPageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Script
        async
        src="https://grapecrush.ambassador.ai/widget/ambassador-chat.js"
        strategy="afterInteractive"
        onLoad={() => {
          window.AmbassadorChat.init({
            domain: 'chat.ambassador.ai',
            pageId: '-vsyv9_4MKus',
          })
        }}
      />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
        }}
      />
      <DefaultSeo
        titleTemplate="Grape Crush Wines | %s"
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/favicon.png',
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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default wrapper.withRedux(App)

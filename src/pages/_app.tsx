import React, { FC, useEffect } from 'react'

import { RouterScrollProvider } from '@moxy/next-router-scroll'
import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'

import '../styles/tailwind.scss'
import { useRouter } from 'next/dist/client/router'
import Script from 'next/script'

import Layout from '@components/layout/Layout'
import * as gtag from '@lib/gTag'
import { wrapper } from '@redux/store'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (window) {
        gtag.pageview(url)
      }
      // fbq.pageview()
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
            // domain: 'chat.ambassador.ai',
            // pageId: '-vsyv9_4MKus',
            domain: 'grapecrush.ambassador.ai',
          })
        }}
      />
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
        }}
      />
      <DefaultSeo
        titleTemplate="Grape Crush | %s"
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
          site_name: 'Grape Crush',
          title: 'Grape Crush',
          description:
            "With one of Ontario's largest natural wines selection, shop from 200+ curated natural, biodynamic, and classic wines for any budget. We ship province-wide.",
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <RouterScrollProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RouterScrollProvider>
    </>
  )
}

export default wrapper.withRedux(App)

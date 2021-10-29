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

import SEO from '../../next-seo-config'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (window) {
        gtag.pageview(url)
      }
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
      <DefaultSeo {...SEO} />
      <RouterScrollProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RouterScrollProvider>
    </>
  )
}

export default wrapper.withRedux(MyApp)

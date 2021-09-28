import React, { FC, useEffect } from 'react'

import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'

import '../styles/tailwind.scss'
import { useRouter } from 'next/dist/client/router'
import Script from 'next/script'

import Layout from '@components/layout/Layout'
import * as fbq from '@lib/fpixel'
import * as gtag from '@lib/gTag'
import { wrapper } from '@redux/store'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
      fbq.pageview()
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
        strategy="lazyOnload"
        onLoad={() => {
          window.AmbassadorChat.init({
            domain: 'chat.ambassador.ai',
            pageId: '-vsyv9_4MKus',
          })
        }}
      />
      <Script
        strategy="afterInteractive"
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
      <Script
        id="fpixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${fbq.FB_PIXEL_ID});
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

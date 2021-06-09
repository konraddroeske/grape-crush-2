import React, { FC } from 'react'

import { AppProps } from 'next/app'

import '../styles/tailwind.scss'
import Layout from '@components/layout/Layout'
import { wrapper } from '@redux/store'

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
)

export default wrapper.withRedux(App)

/* eslint-disable react/react-in-jsx-scope */
import type { AppProps } from 'next/app'
import '../styles/global.scss'
import '../styles/custom-theme.scss'
import WebLayout from '../components/WebLayout'
import React from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WebLayout>
      <Component {...pageProps} />
    </WebLayout>
  )
}

export default MyApp

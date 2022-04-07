import Head from 'next/head'
import React from 'react'
import ChainDiff from '../components/ChainDiff'
import { getSyncedMetadata } from '../utils/metadata-utils'

export const getStaticProps = async () => {
  const metadata = await getSyncedMetadata()

  return {
    props: {
      metadata,
    },
  }
}

interface ChainDiffProps {
  metadata: any
}

const Main = (props: ChainDiffProps) => {
  return (
    <>
      <Head>
        <title>Metadata diff</title>
      </Head>
      <ChainDiff metadata={props.metadata} defaultChain="polkadot" />
    </>
  )
}

export default Main

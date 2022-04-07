import React, { useEffect, useState } from 'react'
import ReactDiffViewer from 'react-diff-viewer'
import { genReport } from '../../substrate-metadata-tools/src'
import { Row, Column, Dropdown } from 'carbon-components-react'
import { Section } from 'carbon-components-react/lib/components/Heading'

interface ChainDiffProps {
  defaultChain?: string
  metadata: any
}

const ChainDiff = ({ defaultChain, metadata }: ChainDiffProps) => {
  const [chain, setChain] = useState<string | null | undefined>(defaultChain)
  const [diffVersionPair, setDiffVersionPair] = useState<string | null | undefined>(null)
  const [versionPairNames, setVersionPairNames] = useState<string[] | null>(null)

  useEffect(() => {
    if (!chain) return
    if (!metadata[chain]) return

    const metadataKeys = Object.keys(metadata[chain]).sort((a, b) => {
      const c = parseInt(a.split(' ')[0].substr(1))
      const d = parseInt(b.split(' ')[0].substr(1))
      return c < d ? -1 : 1
    })

    const pairNames = metadataKeys.slice(0, -1).map((val, ind) => {
      return `${metadataKeys[ind + 1]} <- ${val}`
    })

    setDiffVersionPair(pairNames.slice(-1)[0])
    setVersionPairNames(pairNames)
  }, [chain, metadata])

  const getDiffProps = () => {
    if (diffVersionPair) {
      const versionPair = diffVersionPair.split(' <- ')

      if (chain && metadata[chain][versionPair[0]] && metadata[chain][versionPair[1]])
        return {
          leftTitle: versionPair[1],
          rightTitle: versionPair[0],
          oldValue: genReport(chain, metadata[chain][versionPair[1]]),
          newValue: genReport(chain, metadata[chain][versionPair[0]]),
          disableWordDiff: true,
        }
    }
  }

  return (
    <Section>
      <Row>
        <Column>
          <Dropdown
            id="diff-chain"
            items={Object.keys(metadata)}
            onChange={({ selectedItem }) => setChain(selectedItem)}
            selectedItem={chain}
            label="Available Chain"
            titleText="Chain"
          />
        </Column>
      </Row>
      {chain && versionPairNames && (
        <Row>
          <Column>
            <Dropdown
              id="diff-version-pair"
              key={`${chain}-version-pair`}
              items={versionPairNames || []}
              selectedItem={diffVersionPair}
              onChange={({ selectedItem }) => setDiffVersionPair(selectedItem)}
              label="Available Versions"
              titleText="Comparing"
            />
          </Column>
        </Row>
      )}
      {chain && diffVersionPair && (
        <Row>
          <Column>
            <ReactDiffViewer {...getDiffProps()} />
          </Column>
        </Row>
      )}
    </Section>
  )
}

export default ChainDiff

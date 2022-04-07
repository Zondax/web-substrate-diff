import * as fs from 'fs'
import { default as metadataJSON } from '../../metadata.json'
import { getMetadata, getSupportedChains, getVersionsAvb } from '../substrate-metadata-tools/src'

export const overwriteMetadataFile = (metadata: any) => {
  fs.writeFile('metadata.json', JSON.stringify(metadata, undefined, 2), err => {
    if (err) {
      console.error(err)
      return
    }
  })
}

export const getSyncedMetadata = async (syncEnabled?: boolean) => {
  const metadata: any = { ...metadataJSON }

  // TODO: Fix sync times
  // if (process.env.NODE_ENV === 'production') syncEnabled = true

  if (syncEnabled)
    for (const chain of getSupportedChains()) {
      if (!metadata[chain]) metadata[chain] = {}

      const versions = getVersionsAvb(chain)

      for (const version of versions) {
        const versionName = `V${parseInt(version.specVersion, 16)} - Block: ${version.blockNumber}`
        if (!metadata[chain][versionName]) {
          let versionMetadata: any = null

          try {
            versionMetadata = (await getMetadata(chain, parseInt(version.specVersion, 16))).data
            console.info(`Metadata added for "${versionName}" on chain "${chain}"`)
          } catch (err) {
            console.info(`Fetching metadata for "${versionName}" on chain "${chain}" failed`)
            console.error(err)
          }

          if (versionMetadata)
            metadata[chain] = {
              ...metadata[chain],
              [versionName]: versionMetadata,
            }
        }
      }
    }

  overwriteMetadataFile(metadata)
  return metadata
}

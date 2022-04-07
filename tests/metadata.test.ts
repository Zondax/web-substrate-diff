import { getMetadata, getVersionsAvb } from '../src/substrate-metadata-tools/src'

jest.setTimeout(30000)

test('Kusama', async () => {
  const versions = getVersionsAvb('kusama')
  expect(versions).not.toBeUndefined()

  const metadata = await getMetadata('kusama', parseInt(versions[0].specVersion, 16))
  expect(metadata).not.toBeUndefined()
})

test('Polkadot', async () => {
  const versions = getVersionsAvb('polkadot')
  expect(versions).not.toBeUndefined()

  const metadata = await getMetadata('polkadot', parseInt(versions[0].specVersion, 16))
  expect(metadata).not.toBeUndefined()
})

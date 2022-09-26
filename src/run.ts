/* eslint-disable no-console */
import parser from 'yargs-parser'

import main from './index.js'
import type { LoadFixtureOptions } from './loadFixtures.js'

(async () => {
  const argv = parser(process.argv.slice(2))
  const {
    ignoredFiles = undefined,
    codecs = undefined,
    dataTypes = undefined
  } = argv as LoadFixtureOptions

  const data = await main({ ignoredFiles, codecs, dataTypes })
  console.log(data)
})().catch((err) => {
  console.error(err)
})

import fs from 'fs'
import path from 'path'

export interface Fixture {
  cid: string
  bytes: Buffer
}
export type SupportedCodecs = 'dag-cbor' | 'dag-json' | 'dag-pb'
export interface LoadFixtureOptions {
  /**
   * Specifically ignore files/folders by name
   */
  ignoredFiles?: string[]

  /**
   * Allowlist of codecs to load fixtures for. If not provided, all codecs will be loaded.
   */
  codecs?: SupportedCodecs[]

  /**
   * Allowlist of data-types to load fixtures for. If not provided, all data-types will be loaded.
   */
  dataTypes?: string[]
}

const defaultIgnoredFiles: string[] = [
  '.gitattributes'
]

async function loadBytes (fixturesDir: string, file: string) {
  const ext = path.extname(file).slice(1)
  const cid = file.substring(0, file.length - ext.length - 1)
  const bytes = await fs.promises.readFile(path.resolve(fixturesDir, file))
  return {
    [ext]: {
      cid,
      bytes
    }
  }
}

/**
 *
 * @param {string} dir
 * @param {LoadFixtureOptions} options
 * @returns
 */
export default async function loadFixtures (dir: string, options?: LoadFixtureOptions) {
  const {
    ignoredFiles = defaultIgnoredFiles,
    codecs = [],
    dataTypes = []
  } = options ?? {}
  const fixturesDir = path.relative(process.cwd(), dir)
  const data: Record<string, Record<string, Fixture>> = {}
  const files = await fs.promises.readdir(fixturesDir)
  for (const file of files.filter((f) => !ignoredFiles.includes(f))) {
    const filePath = path.resolve(fixturesDir, file)
    const stat = await fs.promises.stat(filePath)
    if (stat.isDirectory()) {
      if (dataTypes.length === 0 || dataTypes.includes(file as SupportedCodecs)) {
        const fileData = await loadFixtures(filePath, options)
        if (Object.entries(fileData).length > 0) {
          Object.assign(data, { [file]: fileData })
        }
      }
    } else {
      const ext = path.extname(file).slice(1)
      if (codecs.length === 0 || codecs.includes(ext as SupportedCodecs)) {
        Object.assign(data, await loadBytes(fixturesDir, file))
      }
    }
  }
  return data
}

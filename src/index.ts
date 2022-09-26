import { simpleGit, SimpleGit } from 'simple-git'
import { execa } from 'execa'

import loadFixtures, { LoadFixtureOptions } from './loadFixtures.js'

export { loadFixtures }

async function setup () {
  const git: SimpleGit = simpleGit()
  try {
    await git.clone('https://github.com/ipld/codec-fixtures.git', './tmp/codec-fixtures')
  } catch {
    // clone fails if it already exists, so we should update it by pulling
    await git.cwd('./tmp/codec-fixtures').pull()
  }

  await execa('npm', ['install'], { cwd: './tmp/codec-fixtures/js' })

  await execa('npm', ['run', 'build'], { cwd: './tmp/codec-fixtures/js' })
}

export default async function main (options?: LoadFixtureOptions) {
  await setup()
  const {
    ignoredFiles = undefined,
    codecs = undefined,
    dataTypes = undefined
  } = options ?? {}

  const data = await loadFixtures('./tmp/codec-fixtures/fixtures', { ignoredFiles, codecs, dataTypes })

  return data
}

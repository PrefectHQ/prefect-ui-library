// adapted from https://github.com/ndaidong/txtgen/blob/main/src/main.js

import {
  sentenceTemplates,
  phrases
} from '@/mocks/sentences/sample'

import {
  rand,
  pickLastPunc,
  generator,
  GeneratorKey
} from '@/mocks/sentences/utils'
import { uniform, random } from '@/utilities/math'


export {
  addNouns,
  addAdjectives,
  addTemplates,
  setNouns,
  setAdjectives,
  setTemplates,
  getNouns,
  getAdjectives,
  getTemplates
} from './sample'

const actions: GeneratorKey[] = [
  'noun', 'aNoun', 'nouns',
  'adjective', 'anAdjective',
]

const trim = (str: string): string => {
  return str.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '')
    .replace(/\r?\n|\r/g, ' ')
    .replace(/\s\s+|\r/g, ' ')
}

const make = (template: string): string => {
  let sentence = template
  const occurrences = template.match(/\{\{(.+?)\}\}/g)

  if (occurrences?.length) {
    for (const occurrence of occurrences) {
      const action = trim(occurrence.replace('{{', '').replace('}}', '')) as GeneratorKey

      let result: string = ''
      if (actions.includes(action)) {
        result = generator[action]()
      }

      sentence = sentence.replace(occurrence, result)
    }
  }
  return sentence
}

const randomStartingPhrase = (): string => {
  if (random() < 0.33) {
    return rand(phrases)
  }
  return ''
}

const makeSentenceFromTemplate = (): string => {
  return make(rand(sentenceTemplates))
}

export const sentence = (): string => {
  const phrase = randomStartingPhrase()
  let str = phrase + makeSentenceFromTemplate()
  str = str.charAt(0).toUpperCase() + str.slice(1)
  str += pickLastPunc()
  return str
}

export const paragraph = (len = 0): string => {
  if (!len) {
    len = uniform(3, 10)
  }
  const minLength = Math.min(len, 15)
  const sentences = []

  while (sentences.length < minLength) {
    const str = sentence()
    sentences.push(str)
  }
  return sentences.join(' ')
}

export const article = (len = 0): string => {
  if (!len) {
    len = uniform(3, 10)
  }
  const minLength = Math.min(len, 15)
  const sentences = []
  while (sentences.length < minLength) {
    const str = paragraph()
    sentences.push(str)
  }
  return sentences.join('\n\n')
}
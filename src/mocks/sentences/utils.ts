// Adapted from https://github.com/ndaidong/txtgen/blob/main/src/util.js

import {
  nouns,
  adjectives
} from '@/mocks/sentences/sample'
import { vowels } from '@/utilities'
import { uniform } from '@/utilities/math'


export const rand = (str: string[]): string => {
  let word
  while (!word) {
    word = str[uniform(0, str.length - 1)]
  }
  return word
}

export const pickLastPunc = (): string => {
  const str = '.......!?!?;...'.split('')
  return rand(str)
}

export const pluralize = (word: string): string => {
  if (word.endsWith('s')) {
    return word
  }
  if (word.match(/(ss|ish|ch|x|us)$/)) {
    word += 'e'
  } else if (word.endsWith('y') && !vowels.includes(word.charAt(word.length - 2))) {
    word = word.slice(0, word.length - 1)
    word += 'ie'
  }
  return `${word }s`
}

export const normalize = (word: string): string => {
  let article = 'a'
  if (word.match(/^(a|e|heir|herb|hour|i|o)/)) {
    article = 'an'
  }
  return `${article} ${word}`
}

export type GeneratorKey = 'noun' | 'aNoun' | 'nouns' | 'adjective' | 'anAdjective'
export type Generator = Record<GeneratorKey, () => string>

export const generator: Generator = {
  noun: () => {
    return rand(nouns)
  },
  aNoun: () => {
    return normalize(rand(nouns))
  },
  nouns: () => {
    return pluralize(rand(nouns))
  },
  adjective: () => {
    return rand(adjectives)
  },
  anAdjective: () => {
    return normalize(rand(adjectives))
  },
}
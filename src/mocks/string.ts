import { paragraph, sentence } from './sentences/generateText'
import { nouns } from './sentences/sample'
import { generateStarName } from './starnames'
import { MockFunction } from '@/services/Mocker'
import { choice } from '@/utilities/arrays'
import { uniform } from '@/utilities/math'

const characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'] as const

export const randomChar: MockFunction<typeof characters[number]> = function() {
  return characters[Math.floor(Math.random() * characters.length)]
}

export const randomNoun: MockFunction<typeof nouns[number]> = function() {
  return choice(nouns)
}

export const randomString: MockFunction<string> = function(chars?: number) {
  if (!chars) {
    chars = this.create('number', [5, 10])
  }

  return new Array(chars).fill(null).map(() => this.create('char')).join('')
}

export const randomSentence: MockFunction<string> = function() {
  return sentence()
}

export const randomParagraph: MockFunction<string> = function(sentences?: number) {
  return paragraph(sentences ? sentences : uniform(2, 5))
}

export const randomRunName: MockFunction<string> = function() {
  return generateStarName()
}
import { MockFunction } from '@/services/Mocker'
import { random, uniform } from '@/utilities/math'

export const randomMarkdownString: MockFunction<string, [{ lines?: number }?]> = function({ lines = 10 } = {}) {
  const mdLines = []

  for (let i = 0; i < lines; i++) {
    const line = this.create('sentence')
    const isHeader = random() > 0.75
    const isCode = random() > 0.75
    const isQuote = random() > 0.75

    if (isHeader) {
      const headerLevel = uniform(1, 6)
      mdLines.push(`${'#'.repeat(headerLevel)} ${line}`)
    } else if (isCode) {
      mdLines.push('```')
      mdLines.push(line)
      mdLines.push('```')
    } else if (isQuote) {
      mdLines.push(`> ${ line}`)
    } else {
      mdLines.push(line)
    }
  }

  return mdLines.join('\n')
}
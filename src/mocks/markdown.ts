import { MockFunction } from '@/services/Mocker'
import { random, uniform } from '@/utilities/math'

export const randomMarkdownHeaderString: MockFunction<string, [{ level?: number }?]> = function({ level = uniform(1, 6) } = {}) {
  return `${'#'.repeat(level)} ${this.create('noun')}`
}

export const randomMarkdownQuoteString: MockFunction<string, [{ lines?: number }?]> = function({ lines = uniform(1, 5) } = {}) {
  const quoteLines: string[] = []

  for (let i = 0; i < lines; i++) {
    quoteLines.push(`> ${this.create('sentence')}`)
  }

  return quoteLines.join('\n')
}

export const randomMarkdownContentString: MockFunction<string, [{ lines?: number }?]> = function({ lines = uniform(1, 5) } = {}) {
  const contentLines: string[] = []

  for (let i = 0; i < lines; i++) {
    const hasCodeSpan = random() > 0.95
    let line = ''

    if (hasCodeSpan) {
      line = `${this.create('sentence')} ${this.create('markdownCodeSpanString')} ${this.create('sentence')}`
    } else {
      line = this.create('sentence')
    }

    contentLines.push(line)
  }

  return contentLines.join('\n')
}

export const randomMarkdownTableString: MockFunction<string, [{ rows?: number, columns?: number }?]> = function({ rows = uniform(1, 5), columns = uniform(1, 5) } = {}) {
  const tableLines: string[] = []

  for (let i = 0; i < rows; i++) {
    const rowLines: string[] = []

    for (let j = 0; j < columns; j++) {
      rowLines.push(this.create('noun'))
    }

    tableLines.push(`| ${rowLines.join(' | ')} |`)
  }

  return tableLines.join('\n')
}

export const randomMarkdownCodeSpanString: MockFunction<string, []> = function() {
  return `\`${this.create('string')}\``
}

export const randomMarkdownCodeBlockString: MockFunction<string, [{ lines?: number }?]> = function({ lines = uniform(1, 5) } = {}) {
  const codeLines: string[] = []

  for (let i = 0; i < lines; i++) {
    codeLines.push(this.create('string'))
  }

  return `\`\`\`\n${codeLines.join('\n')}\n\`\`\``
}


export const randomMarkdownString: MockFunction<string, [{ lines?: number }?]> = function({ lines = 10 } = {}) {
  type MarkdownLine = {
    type: 'header' | 'quote' | 'content' | 'table',
    content: string,
    level?: number,
  }
  const markdownLines: MarkdownLine[] = []

  for (let i = 0; i < lines; i++) {
    const lastLine: MarkdownLine | undefined = markdownLines[markdownLines.length - 1]

    if (!lastLine) {
      markdownLines.push({
        type: 'header',
        content: this.create('markdownHeaderString'),
        level: 1,
      })

      continue
    }

    const isHeader = random() > 0.9

    if (isHeader) {
      let headerLevel: number = 1

      if (lastLine.type == 'header' && lastLine.level && lastLine.level < 6) {
        headerLevel = lastLine.level + 1
      } else {
        headerLevel = uniform(2, 5)
      }

      markdownLines.push({
        type: 'header',
        content: this.create('markdownHeaderString'),
        level: headerLevel,
      })

      continue
    }

    const isContent = random() > 0.5

    if (isContent) {

      const isQuote = random() > 0.9
      if (isQuote) {
        markdownLines.push({
          type: 'quote',
          content: this.create('markdownQuoteString'),
        })

        continue
      }

      const isTable = random() > 0.9
      if (isTable) {
        markdownLines.push({
          type: 'table',
          content: this.create('markdownTableString'),
        })

        continue
      }

      const isCode = random() > 0.9
      if (isCode) {
        markdownLines.push({
          type: 'content',
          content: this.create('markdownCodeBlockString'),
        })

        continue
      }


      markdownLines.push({
        type: 'content',
        content: this.create('markdownContentString'),
      })

      continue
    }
  }

  return markdownLines.map(mdl => mdl.content).join('\n')
}
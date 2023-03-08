import { choice } from '..'
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

  return `\n${quoteLines.join('\n')}`
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

export const randomMarkdownTableString: MockFunction<string, [{ rows?: number, columns?: number }?]> = function({ rows = uniform(4, 10), columns = uniform(3, 8) } = {}) {
  const tableLines: string[] = []

  const columnHeaders = []
  const headerAlignments = []
  for (let i = 0; i < columns; i++) {
    const alignment = choice([':--', ':--:', '--:'])
    columnHeaders.push(this.create('noun'))
    headerAlignments.push(alignment)
  }
  tableLines.push(`| ${columnHeaders.join(' | ')} |`)
  tableLines.push(`| ${headerAlignments.join(' | ')} |`)


  for (let i = 0; i < rows; i++) {
    const rowLines: string[] = []

    for (let i_ = 0; i_ < columns; i_++) {
      rowLines.push(this.create('noun'))
    }

    tableLines.push(`| ${rowLines.join(' | ')} |`)
  }


  return `\n${tableLines.join('\n')}\n`
}

export const randomMarkdownCodeSpanString: MockFunction<string, []> = function() {
  return `\`${this.create('noun')}\``
}

export const randomMarkdownCodeBlockString: MockFunction<string, [{ lines?: number }?]> = function({ lines = uniform(1, 5) } = {}) {
  const codeLines: string[] = []

  for (let i = 0; i < lines; i++) {
    codeLines.push(this.create('sentence'))
  }

  return `\`\`\`\n${codeLines.join('\n')}\n\`\`\``
}

type MarkdownType = 'header' | 'quote' | 'content' | 'code' | 'table'
const markdownTypes: MarkdownType[] = ['header', 'quote', 'content', 'code', 'table']
type MarkdownLine = {
  type: MarkdownType,
  content: string,
  level?: number,
}

export const randomMarkdownString: MockFunction<string, [{ sections?: number }?]> = function({ sections = 5 } = {}) {

  const markdownLines: MarkdownLine[] = []

  markdownLines.push({
    type: 'header',
    content: this.create('markdownHeaderString', [{ level: 1 }]),
    level: 1,
  })

  for (let i = 0; i < sections; i++) {
    const lastLine: MarkdownLine | undefined = markdownLines[markdownLines.length - 1]
    const type = choice(markdownTypes)

    if (type == 'header' && i < sections - 1) {
      let headerLevel: number = 1

      if (lastLine.type == 'header' && lastLine.level && lastLine.level < 6) {
        headerLevel = lastLine.level + 1
      } else {
        headerLevel = uniform(2, 5)
      }

      markdownLines.push({
        type: 'header',
        content: this.create('markdownHeaderString', [{ level: headerLevel }]),
        level: headerLevel,
      })

      continue
    }


    if (type == 'quote') {
      markdownLines.push({
        type: 'quote',
        content: this.create('markdownQuoteString'),
      })

      continue
    }

    if (type == 'table') {
      markdownLines.push({
        type: 'table',
        content: this.create('markdownTableString'),
      })

      continue
    }

    if (type == 'code') {
      markdownLines.push({
        type: 'content',
        content: this.create('markdownCodeBlockString'),
      })

      continue
    }

    // Default to content
    markdownLines.push({
      type: 'content',
      content: this.create('markdownContentString'),
    })

    continue
  }

  return markdownLines.map(mdl => mdl.content).join('\n\n')
}
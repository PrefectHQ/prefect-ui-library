import type { Environment, TokenStream } from 'prismjs'
import { languages, plugins, highlight } from 'prismjs'
import { definition as markupDefinition } from './markup'
import { definition as yamlDefinition } from './yaml'
import { mocker } from '@/services/Mocker'

// Allow only one line break
const inner = /(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source
const tableCell = /(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source
const tableRow = /\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(/__/g, () => tableCell)
const tableLine = /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source


/**
 * This function is intended for the creation of the bold or italic pattern.
 *
 * This also adds a lookbehind group to the given pattern to ensure that the pattern is not backslash-escaped.
 *
 * _Note:_ Keep in mind that this adds a capturing group.
 *
 * @param {string} pattern
 * @returns {RegExp}
 */
function createInline(pattern: string): RegExp {
  pattern = pattern.replace(/<inner>/g, () => inner)
  return RegExp(`${/((?:^|[^\\])(?:\\{2})*)/.source}(?:${pattern})`)
}

const bold = {
  // **strong**
  // __strong__

  // allow one nested instance of italic text using the same delimiter
  pattern: createInline(/\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source),
  lookbehind: true,
  greedy: true,
  inside: {
    content: {
      pattern: /(^..)[\s\S]+(?=..$)/,
      lookbehind: true,
      // see below
      inside: {},
    },
    punctuation: /\*\*|__/,
  },
}

const italic = {
  // *em*
  // _em_

  // allow one nested instance of bold text using the same delimiter
  pattern: createInline(/\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source),
  lookbehind: true,
  greedy: true,
  inside: {
    content: {
      pattern: /(^.)[\s\S]+(?=.$)/,
      lookbehind: true,
      // see below
      inside: {},
    },
    punctuation: /[*_]/,
  },
}

const strike = {
  // ~~strike through~~
  // ~strike~
  pattern: createInline(/(~~?)(?:(?!~)<inner>)+\2/.source),
  lookbehind: true,
  greedy: true,
  inside: {
    content: {
      pattern: /(^~~?)[\s\S]+(?=\1$)/,
      lookbehind: true,
      inside: {},
    },
    punctuation: /~~?/,
  },
}

const url = {
  // [example](http://example.com "Optional title")
  // [example][id]
  // [example] [id]
  // TODO: This doesn't support empty strings as links, like you might use for images
  // the first <inner> replacement is likely the culprit
  pattern: createInline(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/.source),
  lookbehind: true,
  greedy: true,
  inside: {
    'operator': /^!/,
    content: {
      pattern: /(^\[)[^\]]+(?=\])/,
      lookbehind: true,
      inside: {},
    },
    'variable': {
      pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/,
      lookbehind: true,
    },
    'url': {
      pattern: /(^\]\()[^\s)]+/,
      lookbehind: true,
    },
    'string': {
      pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
      lookbehind: true,
    },
  },
}

const codeSnippet = {
  // `code`
  // ``code``
  pattern: /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,
  lookbehind: true,
  greedy: true,
  alias: ['code', 'keyword'],
}

type MarkdownDefinition = Record<string, any>
const definition: MarkdownDefinition = {
  'front-matter-block': {
    pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
    lookbehind: true,
    greedy: true,
    inside: {
      punctuation: /^---|---$/,
      'front-matter': {
        pattern: /\S+(?:\s+\S+)*/,
        alias: ['yaml', 'language-yaml'],
        // Replaced with YAML definition below
        inside: {},
      },
    },
  },
  'blockquote': {
    // > ...
    pattern: /^>(?:[\t ]*>)*/m,
    alias: 'punctuation',
  },
  'table': {
    pattern: RegExp(`^${tableRow}${tableLine}(?:${tableRow})*`, 'm'),
    inside: {
      'table-data-rows': {
        pattern: RegExp(`^(${tableRow}${tableLine})(?:${tableRow})*$`),
        lookbehind: true,
        inside: {
          'table-data': {
            pattern: RegExp(tableCell),
            // Replaced with definition below
            inside: {},
          },
          punctuation: /\|/,
        },
      },
      'table-line': {
        pattern: RegExp(`^(${tableRow})${tableLine}$`),
        lookbehind: true,
        inside: {
          punctuation: /\||:?-{3,}:?/,
        },
      },
      'table-header-row': {
        pattern: RegExp(`^${tableRow}$`),
        inside: {
          'table-header': {
            pattern: RegExp(tableCell),
            alias: 'important',
            // Replaced with definition below
            inside: {},
          },
          punctuation: /\|/,
        },
      },
    },
  },
  'code': [
    {
      // Prefixed by 4 spaces or 1 tab and preceded by an empty line
      pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
      lookbehind: true,
      alias: 'keyword',
    },
    {
      // ```optional language
      // code block
      // ```
      pattern: /^```[\s\S]*?^```$/m,
      greedy: true,
      inside: {
        'code-block': {
          pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
          lookbehind: true,
        },
        'code-language': {
          pattern: /^(```).+/,
          lookbehind: true,
        },
        punctuation: /```/,
      },
    },
  ],
  'title': [
    {
      // title 1
      // =======

      // title 2
      // -------
      pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
      alias: 'important',
      inside: {
        punctuation: /==+$|--+$/,
      },
    },
    {
      // # title 1
      // ###### title 6
      pattern: /(^\s*)#.+/m,
      lookbehind: true,
      alias: 'important',
      inside: {
        punctuation: /^#+|#+$/,
      },
    },
  ],
  'hr': {
    // ***
    // ---
    // * * *
    // -----------
    pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
    lookbehind: true,
    alias: 'punctuation',
  },
  'list': {
    // * item
    // + item
    // - item
    // 1. item
    pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
    lookbehind: true,
    alias: 'punctuation',
  },
  'url-reference': {
    // [id]: http://example.com "Optional title"
    // [id]: http://example.com 'Optional title'
    // [id]: http://example.com (Optional title)
    // [id]: <http://example.com> "Optional title"
    pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
    inside: {
      'variable': {
        pattern: /^(!?\[)[^\]]+/,
        lookbehind: true,
      },
      'string': /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
      punctuation: /^[[\]!:]|[<>]/,
    },
    alias: 'url',
  },
  'code-snippet': codeSnippet,
  'bold': bold,
  'italic': italic,
  'strike': strike,
  'url': url,
}

const tokens = ['url', 'bold', 'italic', 'strike']
const insideTokens = ['url', 'bold', 'italic', 'strike', 'code-snippet']

tokens.forEach((token): void => {
  insideTokens.forEach((inside): void => {
    if (token !== inside && token in definition) {
      definition[token].inside.content.inside[inside] = definition[inside]
    }
  })
})

const tagPattern = RegExp(markupDefinition.tag.pattern.source, 'gi')
const KNOWN_ENTITY_NAMES = {
  'amp': '&',
  'lt': '<',
  'gt': '>',
  'quot': '"',
}

const { fromCodePoint } = String

/**
   * Returns the text content of a given HTML source code string.
   *
   * @param {string} html
   * @returns {string}
   */
function textContent(html: string): string {
  // remove all tags
  let text = html.replace(tagPattern, '')

  // decode known entities
  text = text.replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, (sub: string, code: string) => {
    code = code.toLowerCase()

    if (code.startsWith('#')) {
      let value
      if (code[1] === 'x') {
        value = parseInt(code.slice(2), 16)
      } else {
        value = Number(code.slice(1))
      }

      return fromCodePoint(value)
    }

    const known = KNOWN_ENTITY_NAMES[code as keyof typeof KNOWN_ENTITY_NAMES]

    if (known) {
      return known
    }

    // unable to decode
    return sub
  })

  return text
}

const wrapHook = (env: Environment): void => {

  if (env.type !== 'code-block') {
    return
  }

  let codeLang = ''
  for (let i = 0, len = env.classes?.length ?? 0; i < len; i++) {
    const cls = env.classes?.[i]

    if (!cls) {
      continue
    }

    const match = /language-(.+)/.exec(cls)

    if (match) {
      [, codeLang] = match
      break
    }
  }

  const grammar = languages[codeLang]
  if (!grammar) {
    if (codeLang && codeLang !== 'none' && plugins.autoloader) {
      if (!env.attributes) {
        return
      }

      const id = mocker.create('id')
      env.attributes.id = id

      plugins.autoloader.loadLanguages(codeLang, (): void => {
        const ele = document.getElementById(id)
        if (ele) {
          ele.innerHTML = highlight(ele.textContent ?? '', languages[codeLang], codeLang)
        }
      })
    }
  } else {
    env.content = highlight(textContent(env.content ?? ''), grammar, codeLang)
  }
}

const afterTokenizeHook = (env: Environment): void => {
  if (env.language !== 'markdown' && env.language !== 'md') {
    return
  }

  function walkTokens(tokens?: TokenStream): void {
    if (!tokens || typeof tokens === 'string' || !Array.isArray(tokens)) {
      return
    }

    for (let i = 0, len = tokens.length; i < len; i++) {
      const token = tokens[i]

      if (typeof token == 'string') {
        continue
      }

      if (token.type !== 'code') {
        walkTokens(token.content)
        continue
      }

      /*
       * Add the correct `language-xxxx` class to this code block. Keep in mind that the `code-language` token
       * is optional. But the grammar is defined so that there is only one case we have to handle:
       *
       * token.content = [
       *     <span class="punctuation">```</span>,
       *     <span class="code-language">xxxx</span>,
       *     '\n', // exactly one new lines (\r or \n or \r\n)
       *     <span class="code-block">...</span>,
       *     '\n', // exactly one new lines again
       *     <span class="punctuation">```</span>
       * ];
       */

      if (!Array.isArray(token.content)) {
        continue
      }

      const [, codeLang, , codeBlock] = token.content

      if (typeof codeLang == 'string' || typeof codeBlock == 'string') {
        continue
      }

      if (
        codeLang.type === 'code-language' &&
        codeBlock.type === 'code-block' &&
        typeof codeLang.content === 'string'
      ) {

        // this might be a language that Prism does not support

        // do some replacements to support C++, C#, and F#
        let lang = codeLang.content.replace(/\b#/g, 'sharp').replace(/\b\+\+/g, 'pp')
        // only use the first word
        lang = (/[a-z][\w-]*/i.exec(lang) ?? [''])[0].toLowerCase()
        const alias = `language-${lang}`

        // add alias
        if (!codeBlock.alias) {
          codeBlock.alias = [alias]
        } else if (typeof codeBlock.alias === 'string') {
          codeBlock.alias = [codeBlock.alias, alias]
        } else {
          codeBlock.alias.push(alias)
        }
      }
    }
  }

  walkTokens(env.tokens)
}


definition['front-matter-block'].inside['front-matter'].inside = yamlDefinition
definition.table.inside['table-data-rows'].inside['table-data'].inside = definition
definition.table.inside['table-header-row'].inside['table-header'].inside = definition

export { definition, wrapHook, afterTokenizeHook }
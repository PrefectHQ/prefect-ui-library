import { Environment, languages } from 'prismjs'

const inlinedDefinition = {
  /**
   * Adds an inlined language to markup.
   *
   * An example of an inlined language is CSS with `<style>` tags.
   *
   * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
   * case insensitive.
   * @param {string} lang The language key.
   * @example
   * addInlined('style', 'css');
   */
  value: function addInlined(tagName: string, lang: string) {
    const includedCdataInside: Record<string, any> = {}
    const langDataName = `language-${lang}`

    includedCdataInside[langDataName] = {
      pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
      lookbehind: true,
      inside: languages[lang],
    }
    includedCdataInside.cdata = /^<!\[CDATA\[|\]\]>$/i

    const inside: Record<string, any> = {
      'included-cdata': {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        inside: includedCdataInside,
      },
    }

    inside[langDataName] = {
      pattern: /[\s\S]+/,
      inside: languages[lang],
    }

    const def: Record<string, any> = {}
    def[tagName] = {
      pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, () => tagName), 'i'),
      lookbehind: true,
      greedy: true,
      inside: inside,
    }

    languages.insertBefore('markup', 'cdata', def)
  },
}

const attributeDefinition = {
  /**
   * Adds an pattern to highlight languages embedded in HTML attributes.
   *
   * An example of an inlined language is CSS with `style` attributes.
   *
   * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
   * case insensitive.
   * @param {string} lang The language key.
   * @example
   * addAttribute('style', 'css');
   */
  value: function(attrName: string, lang: string) {
    const langDataName = `language-${lang}`

    if (!('tag' in languages.markup) || !('inside' in languages.markup.tag) || !languages.markup.tag.inside || !('special-attr' in languages.markup.tag.inside) || !Array.isArray(languages.markup.tag.inside['special-attr'])) {
      return
    }

    languages.markup.tag.inside['special-attr'].push({
      pattern: RegExp(
        `${/(^|["'\s])/.source}(?:${attrName})${/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source}`,
        'i',
      ),
      lookbehind: true,
      inside: {
        'attr-name': /^[^\s=]+/,
        'attr-value': {
          pattern: /=[\s\S]+/,
          inside: {
            'value': {
              pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
              lookbehind: true,
              alias: [lang, langDataName],
              inside: languages[lang],
            },
            'punctuation': [
              {
                pattern: /^=/,
                alias: 'attr-equals',
              },
              /"|'/,
            ],
          },
        },
      },
    })
  },
}

const definition = {
  'comment': {
    pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
    greedy: true,
  },
  'prolog': {
    pattern: /<\?[\s\S]+?\?>/,
    greedy: true,
  },
  'doctype': {
    // https://www.w3.org/TR/xml/#NT-doctypedecl
    pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: true,
    inside: {
      'internal-subset': {
        pattern: /(^[^[]*\[)[\s\S]+(?=\]>$)/,
        lookbehind: true,
        greedy: true,
        inside: {},
      },
      'string': {
        pattern: /"[^"]*"|'[^']*'/,
        greedy: true,
      },
      'punctuation': /^<!|>$|[[\]]/,
      'doctype-tag': /^DOCTYPE/i,
      'name': /[^\s<>'"]+/,
    },
  },
  'cdata': {
    pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
    greedy: true,
  },
  'tag': {
    pattern: /<\/?(?!\d)[^\s>/=$<%]+(?:\s(?:\s*[^\s>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: true,
    addInlined: inlinedDefinition,
    addAttribute: attributeDefinition,
    inside: {
      'tag': {
        pattern: /^<\/?[^\s>/]+/,
        inside: {
          'punctuation': /^<\/?/,
          'namespace': /^[^\s>/:]+:/,
        },
      },
      'special-attr': [],
      'attr-value': {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          'punctuation': [
            {
              pattern: /^=/,
              alias: 'attr-equals',
            },
            {
              pattern: /^(\s*)["']|["']$/,
              lookbehind: true,
            },
          ],
          'entity': {},
        },
      },
      'punctuation': /\/?>/,
      'attr-name': {
        pattern: /[^\s>/]+/,
        inside: {
          'namespace': /^[^\s>/:]+:/,
        },
      },

    },
  },
  'entity': [
    {
      pattern: /&[\da-z]{1,8};/i,
      alias: 'named-entity',
    },
    /&#x?[\da-f]{1,8};/i,
  ],
}

definition.tag.inside['attr-value'].inside.entity = definition.entity
definition.doctype.inside['internal-subset'].inside = definition

const wrapHook = (env: Environment): void => {
  if (env.type === 'entity' && env.attributes && env.content) {
    env.attributes.title = env.content.replace(/&amp;/, '&')
  }
}

export { definition, wrapHook }
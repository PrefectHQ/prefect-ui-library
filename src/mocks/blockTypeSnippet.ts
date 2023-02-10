import { MockFunction } from '@/services/Mocker'
import { capitalize } from '@/utilities/strings'

export const randomBlockTypeSnippet: MockFunction<string, []> = function() {
  const importName = this.create('noun')

  return `
\`\`\`python
from prefect.filesystem import ${capitalize(importName)}

${importName}_block = ${capitalize(importName)}.load("BLOCK_NAME")
\`\`\`
  `.trim()
}
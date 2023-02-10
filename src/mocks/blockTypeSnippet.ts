import { MockFunction } from '@/services/Mocker'
import { capitalize } from '@/utilities/strings'

export const randomBlockTypeSnippet: MockFunction<string, []> = function() {
  const importName = this.create('noun')

  return `
\`\`\`python
from prefect.filesystem import ${capitalize(importName)}

Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit harum mollitia error corporis fugiat itaque, similique officia aperiam reiciendis neque quia, nemo velit nulla, sit iure! Repudiandae inventore dolores reprehenderit.

${importName}_block = ${capitalize(importName)}.load("BLOCK_NAME")
\`\`\`
  `.trim()
}
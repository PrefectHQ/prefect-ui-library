<template>
  <ComponentPage title="CodeSnippet" :demos="demos">
    <CodeSnippet snippet="hello world" />

    <template #json>
      <CodeSnippet language="JSON" :snippet="json" />
    </template>

    <template #python>
      <CodeSnippet language="python" :snippet="python" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import CodeSnippet from '@/components/CodeSnippet.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { DemoSection } from '@/demo/types/demoSection'
  import { mocker } from '@/services/Mocker'
  import { capitalize } from '@/utilities/strings'

  const demos: DemoSection[] = [
    { title: 'JSON' },
    { title: 'Python' },
  ]

  const json = `
{
  "foo": "bar",
  "yes": false,
  "single": ["is", "it", "really", "?"],
  "multiple": "no"
}
`.trim()

  const importName = mocker.create('noun')

  const python = `
from prefect.filesystem import ${capitalize(importName)}

${importName}_block = ${capitalize(importName)}.load("BLOCK_NAME")
`.trim()
</script>
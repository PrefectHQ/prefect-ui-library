<template>
  <ComponentPage title="CopyableWrapper" :demos="demos" description="This component provides only a relative parent div and a hidden unless hovered copy button. When the copy button is pressed, the value  of the prop `text-to-copy` will be copied into clipboard.">
    <p-card>
      <CopyableWrapper text-to-copy="hello world">
        Hello World
      </CopyableWrapper>
    </p-card>

    <template #json>
      <p-card>
        <CopyableWrapper :text-to-copy="json">
          <p-code-highlight lang="json" :text="json" />
        </CopyableWrapper>
      </p-card>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import CopyableWrapper from '@/components/CopyableWrapper.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = [{ title: 'JSON' }]

  const json = `
{
  "foo": "bar",
  "yes": false,
  "single": ["is", "it", "really", "?"],
  "multiple": "no"
}
`.trim()
</script>
<template>
  <ComponentPage title="CodeView">
    <CodeView :value="json" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import CodeView from '@/components/CodeView.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'

  const json = `
{
  "foo": "bar",
  "yes": false,
  "single": ["is", "it", "really", "?"],
  "multiple": "no"
}
`.trim()
</script>
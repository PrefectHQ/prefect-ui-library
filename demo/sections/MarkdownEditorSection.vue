<template>
  <DemoSection heading="Markdown Editor">
    <p-content>
      <MarkdownInput v-model="markdownRef" class="markdown-editor-section__input" />
    </p-content>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import MarkdownInput from '@/components/MarkdownInput.vue'

  const markdownRef = ref('')

  onMounted(async () => {
    markdownRef.value = await fetch('https://raw.githubusercontent.com/PrefectHQ/prefect/main/README.md').then(res => res.text())
  })
</script>

<style>
.markdown-editor-section__input {
  min-height: 800px;
  resize: vertical;
}
</style>
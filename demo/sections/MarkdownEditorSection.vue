<template>
  <DemoSection heading="Markdown Editor">
    <p-content>
      <p-tabs :tabs="['Edit', 'Preview']">
        <template #edit>
          <MarkdownInput v-model="markdownRef" class="markdown-editor-section__input" />
        </template>
        <template #preview>
          <MarkdownView v-model="markdownRef" class="markdown-editor-section__view" />
        </template>
      </p-tabs>
    </p-content>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import MarkdownInput from '@/components/MarkdownInput.vue'
  import MarkdownView from '@/components/MarkdownView.vue'

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
<template>
  <DemoSection heading="Markdown Editor">
    <p-content>
      <p-select v-model="selectedMarkdown" :options="options" />

      <p-tabs class="section-container" :tabs="['Preview', 'Edit']">
        <template #preview>
          <MarkdownView :value="markdownRef" class="markdown-editor-section__view" />
        </template>

        <template #edit>
          <MarkdownInput v-model="markdownRef" class="markdown-editor-section__input" />
        </template>
      </p-tabs>
    </p-content>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { SelectOption } from '@prefecthq/prefect-design'
  import { onMounted, ref, watch } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import { MarkdownInput, MarkdownView } from '@/components'

  const options: (SelectOption & { url: string })[] = [
    { label: 'Prefect', value: 'prefect', url: 'https://raw.githubusercontent.com/PrefectHQ/prefect/main/README.md' },
    { label: 'Fiber', value: 'fiber', url: 'https://raw.githubusercontent.com/gofiber/fiber/master/.github/README.md' },
  ]

  const selectedMarkdown = ref('fiber')

  const markdownRef = ref('')

  const getMarkdown = async (): Promise<void> => {
    const url = options.find(option => option.value == selectedMarkdown.value)?.url

    if (!url) {
      return
    }

    markdownRef.value = await fetch(url).then(res => res.text())
  }

  watch(selectedMarkdown, getMarkdown)

  onMounted(getMarkdown)
</script>

<style>
.markdown-editor-section__input {
  min-height: 800px;
  resize: vertical;
}

.markdown-editor-section__view {
  min-height: 800px;
}

.section-container { @apply
  w-full
  max-w-full
  overflow-hidden
}
</style>
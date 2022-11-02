<template>
  <ComponentPage title="Block Document Input" :demos="demos">
    <div class="h-64">
      <BlockDocumentInput v-model="selected" :block-type-slug="blockType.slug" />
    </div>

    <template #empty>
      <BlockDocumentInput v-model="selectedEmpty" :block-type-slug="blockTypeEmpty.slug" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import BlockDocumentInput from '@/components/BlockDocumentInput.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useBlockDocumentsMock } from '@/demo/compositions/useBlockDocumentMock'
  import { useBlockTypeMock } from '@/demo/compositions/useBlockTypeMock'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = [{ title: 'Empty', description: 'An input with no block documents to choose from' }]

  const selected = ref(null)
  const blockType = useBlockTypeMock()

  useBlockDocumentsMock(5, () => ({
    blockType,
    blockTypeId: blockType.id,
  }))

  const selectedEmpty = ref(null)
  const blockTypeEmpty = useBlockTypeMock()
</script>
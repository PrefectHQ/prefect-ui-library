<template>
  <div class="block-documents-select">
    <p-select v-model="model" :options="options" />
  </div>
</template>

<script lang="ts" setup>
  import { SelectOption } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { BlockDocument } from '@/models/BlockDocument'

  const props = defineProps<{
    selected: string | null | undefined,
    blockDocuments: BlockDocument[],
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: string | null): void,
  }>()

  const options = computed<SelectOption[]>(() => props.blockDocuments.map(document => ({ label: document.name, value: document.id })))

  const model = computed({
    get() {
      return props.selected ?? null
    },
    set(value: string | null) {
      emit('update:selected', value)
    },
  })
</script>
<template>
  <div class="block-documents-select">
    <p-select v-model="model" :options="options" />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { BlockDocument } from '@/models/BlockDocument'
  import { mapper } from '@/services'

  const props = defineProps<{
    selected: string | null | undefined,
    blockDocuments: BlockDocument[],
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: string | null): void,
  }>()

  const options = computed(() => mapper.map('BlockDocument', props.blockDocuments, 'SelectOption'))

  const model = computed({
    get() {
      return props.selected ?? null
    },
    set(value: string | null) {
      emit('update:selected', value)
    },
  })
</script>
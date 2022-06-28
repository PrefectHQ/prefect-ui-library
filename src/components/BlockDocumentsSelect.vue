<template>
  <div class="block-documents-select" :class="classes" :style="styles">
    <p-select v-model="model" :options="options" v-bind="attrs" />
  </div>
</template>

<script lang="ts" setup>
  import { useAttrsStylesAndClasses } from '@prefecthq/prefect-design'
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

  const { classes, styles, attrs } = useAttrsStylesAndClasses()

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
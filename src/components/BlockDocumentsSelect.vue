<template>
  <div class="block-documents-select" :class="classes" :style="styles">
    <p-select v-model="model" :options="options" :required="required" v-bind="attrs" />
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
    required?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: string | null): void,
  }>()

  const { classes, styles, attrs } = useAttrsStylesAndClasses()

  const options = computed(() => {
    const documents = mapper.map('BlockDocument', props.blockDocuments, 'SelectOption')

    if (props.required) {
      return documents
    }

    const none = { label: 'None', value: null }

    return [none, ...documents]
  })

  const model = computed({
    get() {
      return props.selected ?? null
    },
    set(value: string | null) {
      emit('update:selected', value)
    },
  })
</script>
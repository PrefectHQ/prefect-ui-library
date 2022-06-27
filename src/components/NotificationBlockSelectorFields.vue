<template>
  Block Schema Form Fields here
  {{ blockSchema }}
  <!-- <BlockSchemaFormFields v-model:data="dataModel" :block-schema="test" /> -->
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import BlockSchemaFormFields from '@/components/BlockSchemaFormFields.vue'
  import { BlockDocumentData } from '@/models/BlockDocument'
  import { BlockSchema } from '@/models/BlockSchema'

  const props = defineProps<{
    blockSchema: any,
    // data: BlockDocumentData,
  }>()

  const test = ref(props.blockSchema)
  console.log(test)

  const emit = defineEmits<{
    (event: 'update:data', value: BlockDocumentData): void,
  }>()

  const dataModel = computed({
    get(): BlockDocumentData {
      return {}
    },
    set(value: BlockDocumentData): void {
      emit('update:data', value)
    },
  })
</script>
<template>
  <SchemaInput v-model="internalDefaultValues" :schema="baseJobTemplate.schema" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { SchemaInput } from '@/components'
  import { BaseJobTemplate } from '@/models'

  const props = defineProps<{
    baseJobTemplate: BaseJobTemplate,
  }>()

  const emit = defineEmits<{
    (event: 'update:baseJobTemplate', value: BaseJobTemplate): void,
  }>()

  const internalDefaultValues = computed({
    get() {
      return props.baseJobTemplate.defaultValues
    },
    set(value) {
      console.log(value)
      // emit('update:baseJobTemplate', value)
    },
  })
</script>
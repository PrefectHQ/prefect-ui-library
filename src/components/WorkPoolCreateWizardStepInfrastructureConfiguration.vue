<template>
  <WorkPoolBaseJobTemplateFormSection v-model:base-job-template="baseJobTemplate" />
</template>

<script lang="ts" setup>
  import { computed, reactive } from 'vue'
  import { WorkPoolBaseJobTemplateFormSection } from '@/components'
  import { WorkerCollectionItem } from '@/models'
  import { WorkPoolFormValues } from '@/models/WorkPool'
  import { WorkerBaseJobTemplate } from '@/types'

  const props = defineProps<{
    workPool: WorkPoolFormValues,
    defaultBaseJobTemplate: WorkerBaseJobTemplate,
  }>()

  const typeIsNotPrefectAgent = computed(() => props.workPool.type !== 'prefect-agent')

  const emit = defineEmits<{
    (event: 'update:workPool', value: WorkPoolFormValues): void,
  }>()

  const workPool = computed({
    get() {
      return props.workPool
    },
    set(value) {
      emit('update:workPool', value)
    },
  })

  const baseJobTemplatesMap = reactive(new Map<string, WorkerBaseJobTemplate>())
  const baseJobTemplate = computed<WorkerBaseJobTemplate>({
    get() {
      if (props.workPool.type) {
        return baseJobTemplatesMap.get(props.workPool.type) ?? props.defaultBaseJobTemplate
      }
      return {}
    },
    set(value) {
      if (props.workPool.type) {
        baseJobTemplatesMap.set(props.workPool.type, value)
        workPool.value.baseJobTemplate = value
      }
    },
  })
</script>
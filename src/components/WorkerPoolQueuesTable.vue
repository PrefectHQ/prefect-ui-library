<template>
  <div class="work-pool-queues-table">
    <OTable v-model:selected-rows="selectedRows" disable-select :data="workerPoolQueues" :columns="columns">
      <template #actions>
        HELLO!
      </template>
    </OTable>
  </div>
</template>

<script lang="ts" setup>
  import { media } from '@prefecthq/prefect-design'
  import { ref, watch } from 'vue'
  import { OTable } from '@/components'
  import { useCan, useWorkspaceRoutes } from '@/compositions'
  import { WorkerPoolQueue } from '@/models'

  const props = defineProps<{
    workerPoolQueues: WorkerPoolQueue[],
  }>()

  const emit = defineEmits<{
    (event: 'update' | 'delete'): void,
  }>()

  const can = useCan()
  const routes = useWorkspaceRoutes()

  const selectedRows = ref<WorkerPoolQueue[]>([])

  watch(selectedRows, (value) => {
    console.log(value)
  })

  const columns = [
    {
      property: 'name',
      label: 'Name',
    },
    {
      property: 'concurrencyLimit',
      label: 'Concurrency Limit',
    },
    {
      property: 'priority',
      label: 'Priority',
    },
    {
      label: '',
      visible: media.md,
    },
  ]
</script>

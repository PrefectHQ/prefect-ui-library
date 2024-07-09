<template>
  <p-content class="task-worker-list">
    <p-list-header sticky>
      <ResultsCount label="Task workers" :count />

      <template #controls>
        <!--  -->
      </template>
    </p-list-header>

    <p-table
      :data="workers"
      :columns="columns"
      :header-classes="columnClasses"
      :column-classes="columnClasses"
      :row-classes="rowClasses"
      class="task-worker-list__table"
      :row-key="(worker: TaskWorker) => worker.id"
    >
      <template #status="{ row }">
        <!--  -->
      </template>

      <template #task-keys="{ row }">
        {{ row.taskKeys }}
      </template>

      <template #action-heading>
        <span />
      </template>

      <template #worker="{ row }">
        {{ row.id }}
      </template>

      <template #last-seen="{ row }">
        <FormattedDate :date="row.lastSeen" />
      </template>


      <template #action="{ row }">
        <!--  -->
      </template>

      <template #empty-state>
        <PEmptyResults v-if="subscription.executed">
          <template #message>
            No task workers found
          </template>
        </PEmptyResults>
        <PEmptyResults v-else>
          <template #message>
            <p-loading-icon />
          </template>
        </PEmptyResults>
      </template>
    </p-table>

    <p-pager v-model:limit="limit" v-model:page="page" :pages="pages" />
  </p-content>
</template>

<script lang="ts" setup>
  import { TableColumn, media } from '@prefecthq/prefect-design'
  import { NumberRouteParam, useLocalStorage, useRouteQueryParam } from '@prefecthq/vue-compositions'
  import { snakeCase } from 'lodash'
  import { computed, ref } from 'vue'
  import {
    ResultsCount,
    FormattedDate
  } from '@/components'
  import { useTaskWorkers } from '@/compositions/useTaskWorkers'
  import { TaskWorker } from '@/models'
  import { TaskWorkerFilter } from '@/models/Filters'
  import { ClassValue } from '@/types'

  const props = defineProps<{
    filter?: TaskWorkerFilter,
    prefix?: string,
  }>()

  const emit = defineEmits<{
    (event: 'delete'): void,
  }>()


  const page = useRouteQueryParam('workers-page', NumberRouteParam, 1)
  const { value: limit } = useLocalStorage('task-worker-list-limit', 10)

  const taskWorkerFilter = computed<TaskWorkerFilter>(() => ({}))
  const { workers, subscription } = useTaskWorkers(taskWorkerFilter, {
    interval: 30000,
  })

  const count = computed<number>(() => workers.value.length)

  const pages = computed<number>(() => Math.ceil(count.value / limit.value))

  const columns = computed<TableColumn<TaskWorker>[]>(() => [
    {
      label: 'Worker',
    },
    {
      label: 'Status',
      width: '116px',
    },
    {
      label: 'Last seen',
      maxWidth: '15%',
    },
    {
      label: 'Task keys',
      visible: media.md,
      maxWidth: '15%',
    },
    {
      label: 'Action',
      width: '82px',
    },
  ])

  const columnClasses = (column: TableColumn<TaskWorker>): ClassValue => [`task-worker-list__${snakeCase(column.label)}-column`]
  const rowClasses = (row: TaskWorker): ClassValue => {
    return {}
  }

  const selectedWorkers = ref<TaskWorker[]>([])

  function refresh(): void {
    subscription.refresh()
  }

  // Is this possible?
  const deleteWorkers = (): void => {
    selectedWorkers.value = []
    refresh()
    emit('delete')
  }
</script>

<style>
.task-worker-list__table .p-table__table { @apply
  table-fixed
  w-full
}

.task-worker-list__action-column,
.task-worker-list__table .p-table__checkbox-cell { @apply
  box-content
}

.task-worker-list__name { @apply
  font-semibold
  text-base
  hover:underline
}

.task-worker-list__name { @apply
  max-w-full
  truncate
}
</style>

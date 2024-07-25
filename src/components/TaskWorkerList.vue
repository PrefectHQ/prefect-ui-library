<template>
  <p-content class="task-worker-list">
    <p-list-header sticky>
      <ResultsCount label="Task worker" :count />

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
      <template #worker="{ row }">
        {{ row.id }}
      </template>

      <template #last-seen="{ row }">
        <!-- TODO: This only updates when lastSeen updates; we can make this count up better -->
        <FormattedDate :date="row.lastSeen" />
      </template>

      <template #task-keys="{ row }">
        <!-- This sort is important to make sure the list is static when no new keys are retrieved; without it the keys will jump around whenever we re-fetch data -->
        <p-table class="task-worker-list__task-key-table" :data="getSortedTaskKeyRows(row)" :columns="taskKeyColumns">
          <template #task-key="{ row: _row }">
            <p-tooltip :text="_row.taskKey">
              <p-tag>
                {{ _row.label }}
              </p-tag>
            </p-tooltip>
          </template>
        </p-table>
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
      label: 'Last seen',
      maxWidth: '15%',
    },
    {
      label: 'Task keys',
      visible: media.md,
      maxWidth: '15%',
    },
  ])

  const taskKeyColumns = [{ label: 'Task key' }]

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

  function getSortedTaskKeyRows(worker: TaskWorker): { taskKey: string, label: string }[] {
    return worker.taskKeys.sort().map((taskKey) => ({ taskKey, label: taskKey.split('-')[0] }))
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

.task-worker-list__task-key-table .p-table-head { @apply
  hidden
}

.task-worker-list__task-key-table .p-table-body { @apply
  !border-t-0
}

.task-worker-list__table .p-table-data { @apply
  align-top
}
</style>

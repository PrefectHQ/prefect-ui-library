<template>
  <div class="flow-runs-filter-group">
    <div class="flow-runs-filter-group__row">
      <p-label :label="media.hover ? 'Date Range' : ''">
        <DateRangeInputWithFlowRunHistory />
      </p-label>
      <p-label label="States">
        <StateNameSelect v-model:selected="states" empty-message="All run states" />
      </p-label>
    </div>
    <div class="flow-runs-filter-group__row">
      <p-label label="Flows">
        <FlowCombobox v-model:selected="flows" empty-message="All flows" />
      </p-label>
      <p-label label="Deployments">
        <DeploymentCombobox v-model:selected="deployments" empty-message="All deployments" />
      </p-label>
      <p-label label="Work Queues">
        <WorkQueueCombobox v-model:selected="workQueues" empty-message="All work queues" />
      </p-label>
      <p-label label="Tags">
        <p-tags-input v-model="tags" empty-message="All tags" />
      </p-label>
    </div>
    <p-label class="flow-runs-filter-group__search" label="Search">
      <SearchInput v-model="name" placeholder="Search by flow run name" label="Search by flow run name" />
    </p-label>
  </div>
</template>

<script lang="ts" setup>
  import { media } from '@prefecthq/prefect-design'
  import DateRangeInputWithFlowRunHistory from '@/components/DateRangeInputWithFlowRunHistory.vue'
  import DeploymentCombobox from '@/components/DeploymentCombobox.vue'
  import FlowCombobox from '@/components/FlowCombobox.vue'
  import SearchInput from '@/components/SearchInput.vue'
  import StateNameSelect from '@/components/StateNameSelect.vue'
  import WorkQueueCombobox from '@/components/WorkQueueCombobox.vue'
  import { useFlowRunFilterFromRoute } from '@/compositions/useFlowRunFilterFromRoute'

  const { states, deployments, workQueues, flows, tags, name } = useFlowRunFilterFromRoute()
</script>

<style>
.flow-runs-filter-group { @apply
  flex
  flex-col
  gap-2
}

.flow-runs-filter-group__row { @apply
  flex
  flex-wrap
  md:flex-nowrap
  gap-2
}

.flow-runs-filter-group__search { @apply
  md:hidden
}

.flow-runs-filter-group__date { @apply
  flex
  flex-wrap
  justify-center
  gap-1
}

.flow-runs-filter-group__date-value { @apply
  w-full
}

.flow-runs-filter-group__date-indicator { @apply
  h-1
  w-1
  flex-grow-0
  flex-shrink-0
  bg-gray-400
  rounded-full
}

.flow-runs-filter-group__date--with-completed .flow-runs-filter-group__date-indicator--completed { @apply
  bg-green-400
}

.flow-runs-filter-group__date--with-failed .flow-runs-filter-group__date-indicator--failed { @apply
  bg-red-400
}
</style>
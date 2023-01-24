<template>
  <div class="flow-runs-filter-group">
    <div class="flow-runs-filter-group__row">
      <p-label :label="media.hover ? 'Date Range' : ''">
        <DateRangeInputWithFlowRunHistory v-model:start-date="expectedStartTimeAfter" v-model:end-date="expectedStartTimeBefore" />
      </p-label>
      <p-label label="States">
        <StateNameSelect v-model:selected="stateNames" empty-message="All run states" />
      </p-label>
    </div>
    <div class="flow-runs-filter-group__row">
      <p-label label="Flows">
        <FlowCombobox v-model:selected="flowIds" empty-message="All flows" />
      </p-label>
      <p-label label="Deployments">
        <DeploymentCombobox v-model:selected="deploymentIds" empty-message="All deployments" />
      </p-label>
      <p-label label="Work Queues">
        <WorkQueueCombobox v-model:selected="workQueueName" empty-message="All work queues" />
      </p-label>
      <p-label label="Tags">
        <FlowRunTagCombobox v-model:selected="tagNames" :filter="filter" empty-message="All tags" />
      </p-label>
    </div>
    <p-label class="flow-runs-filter-group__search" label="Search">
      <SearchInput v-model="nameLike" placeholder="Search by flow run name" label="Search by flow run name" />
    </p-label>
  </div>
</template>

<script lang="ts" setup>
  import { media } from '@prefecthq/prefect-design'
  import DateRangeInputWithFlowRunHistory from '@/components/DateRangeInputWithFlowRunHistory.vue'
  import DeploymentCombobox from '@/components/DeploymentCombobox.vue'
  import FlowCombobox from '@/components/FlowCombobox.vue'
  import FlowRunTagCombobox from '@/components/FlowRunTagCombobox.vue'
  import SearchInput from '@/components/SearchInput.vue'
  import StateNameSelect from '@/components/StateNameSelect.vue'
  import WorkQueueCombobox from '@/components/WorkQueueCombobox.vue'
  import { useFlowRunsFilterFromRoute } from '@/compositions/filters'

  const { flows, flowRuns, deployments, filter } = useFlowRunsFilterFromRoute()
  const { expectedStartTimeAfter, expectedStartTimeBefore, state, tags, nameLike, workQueueName } = flowRuns
  const { name: stateNames } = state
  const { name: tagNames } = tags
  const { id: flowIds } = flows
  const { id: deploymentIds } = deployments
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
</style>
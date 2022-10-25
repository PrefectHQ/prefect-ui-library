<template>
  <div class="flow-runs-filter-group">
    <div class="flow-runs-filter-group__row">
      <p-label :label="media.hover ? 'Date Range' : ''">
        <DateRangeInput v-model:startDate="internalStartDate" v-model:endDate="internalEndDate" clearable />
      </p-label>
      <p-label label="States">
        <StateSelect v-model:selected="states" empty-message="All run states" />
      </p-label>
    </div>
    <div class="flow-runs-filter-group__row">
      <p-label label="Flows">
        <FlowCombobox v-model:selected="flows" empty-message="All flows" />
      </p-label>
      <p-label label="Deployments">
        <DeploymentCombobox v-model:selected="deployments" empty-message="All deployments" />
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
  import { ref, watch } from 'vue'
  import DateRangeInput from '@/components/DateRangeInput.vue'
  import DeploymentCombobox from '@/components/DeploymentCombobox.vue'
  import FlowCombobox from '@/components/FlowCombobox.vue'
  import SearchInput from '@/components/SearchInput.vue'
  import StateSelect from '@/components/StateSelect.vue'
  import { useFlowRunFilterFromRoute } from '@/compositions/useFlowRunFilterFromRoute'

  const { states, deployments, flows, tags, name, startDate, endDate, updateFilters } = useFlowRunFilterFromRoute()

  const internalStartDate = ref<Date | null>(startDate.value)
  const internalEndDate = ref<Date | null>(endDate.value)

  watch([internalStartDate, internalEndDate], ([startDate, endDate]) => {
    if (startDate && endDate) {
      updateFilters({ startDate, endDate })
    }
  })
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
</style>
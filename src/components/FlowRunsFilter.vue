<template>
  <div class="flow-runs-filter">
    <p-date-range-input v-model:startDate="internalStartDate" v-model:endDate="internalEndDate" class="flow-runs-filter__date-range" clearable />
    <p-label class="flow-runs-filter__states" :label="media.md ? '' : 'States'">
      <StateSelect v-model:selected="states" empty-message="All run states" />
    </p-label>
    <p-label class="flow-runs-filter__flows" :label="media.md ? '' : 'Flows'">
      <FlowCombobox v-model:selected="flows" empty-message="All flows" />
    </p-label>
    <p-label class="flow-runs-filter__deployments" :label="media.md ? '' : 'Deployments'">
      <DeploymentCombobox v-model:selected="deployments" empty-message="All deployments" />
    </p-label>
    <p-label class="flow-runs-filter__tags" :label="media.md ? '' : 'Tags'">
      <p-tags-input v-model="tags" empty-message="All tags" />
    </p-label>
    <template v-if="!media.md">
      <p-label class="flow-runs-filter__search" label="Search">
        <SearchInput v-model="name" placeholder="Search by flow run name" label="Search by flow run name" />
      </p-label>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { media } from '@prefecthq/prefect-design'
  import { ref, watch } from 'vue'
  import { useFlowRunFilterFromRoute } from '@/compositions/useFlowRunFilterFromRoute'

  const { states, deployments, flows, tags, name, startDate, endDate, setFilters } = useFlowRunFilterFromRoute()

  const internalStartDate = ref<Date | null>(startDate.value)
  const internalEndDate = ref<Date | null>(endDate.value)

  watch([internalStartDate, internalEndDate], ([startDate, endDate]) => {
    if (startDate && endDate) {
      setFilters({ startDate, endDate })
    }
  })
</script>

// run retention message drop below all filters
// combine into single orion-design filters component
// { date-range | states }
// { flows | deployments | work-queues | tags }
// { search }
// deploy & work-queue could be not visible depending on permissions

<style>
.flow-runs-filter__date { @apply

}

.flow-runs-filter__states { @apply

}

.flow-runs-filter__flows { @apply

}

.flow-runs-filter__deployments { @apply

}

.flow-runs-filter__tags { @apply

}
</style>
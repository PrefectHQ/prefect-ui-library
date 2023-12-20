<template>
  <div class="flow-runs-filter-group">
    <div class="flow-runs-filter-group__row">
      <p-label label="Date Range">
        <DateRangeSelect v-model="range" />
      </p-label>
      <p-label label="States">
        <StateNameSelect v-model:selected="state" empty-message="All run states" multiple />
      </p-label>
    </div>
    <div class="flow-runs-filter-group__row">
      <p-label label="Flows">
        <FlowCombobox v-model:selected="flow" empty-message="All flows" multiple />
      </p-label>
      <p-label label="Deployments">
        <DeploymentCombobox v-model:selected="deployment" empty-message="All deployments" multiple />
      </p-label>
      <p-label label="Work Pools">
        <WorkPoolCombobox v-model:selected="workPool" empty-message="All pools" multiple />
      </p-label>
      <p-label label="Tags">
        <FlowRunTagsInput v-model:selected="tag" empty-message="All tags" />
      </p-label>
    </div>
    <p-label class="flow-runs-filter-group__search" label="Search">
      <SearchInput v-model="flowRunName" placeholder="Search by flow run name" label="Search by flow run name" />
    </p-label>
  </div>
</template>

<script lang="ts" setup>
  import { PLabel } from '@prefecthq/prefect-design'
  import { usePatchRef } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import DateRangeSelect from '@/components/DateRangeSelect.vue'
  import DeploymentCombobox from '@/components/DeploymentCombobox.vue'
  import FlowCombobox from '@/components/FlowCombobox.vue'
  import FlowRunTagsInput from '@/components/FlowRunTagsInput.vue'
  import SearchInput from '@/components/SearchInput.vue'
  import StateNameSelect from '@/components/StateNameSelect.vue'
  import WorkPoolCombobox from '@/components/WorkPoolCombobox.vue'
  import { SavedSearchFilter } from '@/models/SavedSearch'

  const props = defineProps<{
    filter: SavedSearchFilter,
    nameSearch: string,
  }>()

  const emit = defineEmits<{
    'update:filter': [SavedSearchFilter],
    'update:name': [string],
  }>()

  const internalFilter = computed({
    get() {
      return props.filter
    },
    set(filter) {
      emit('update:filter', filter)
    },
  })

  const flowRunName = computed({
    get() {
      return props.nameSearch
    },
    set(name) {
      emit('update:name', name)
    },
  })

  const state = usePatchRef(internalFilter, 'state')
  const flow = usePatchRef(internalFilter, 'flow')
  const deployment = usePatchRef(internalFilter, 'deployment')
  const workPool = usePatchRef(internalFilter, 'workPool')
  const tag = usePatchRef(internalFilter, 'tag')
  const range = usePatchRef(internalFilter, 'range')
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
  gap-2
  md:grid
  md:grid-flow-col
  md:auto-cols-fr
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
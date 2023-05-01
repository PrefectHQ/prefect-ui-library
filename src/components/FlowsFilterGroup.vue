<template>
  <div class="flows-filter-group">
    <div class="flows-filter-group__row">
      <p-label :label="localization.info.deploymentName">
        <SearchInput v-model="deploymentNameLike" :placeholder="localization.info.searchByDeploymentName" :label="localization.info.searchByDeploymentName" />
      </p-label>

      <p-label :label="localization.info.deploymentTags">
        <p-tags-input v-model="filter.flowRuns.tags.name" :empty-message="localization.info.all" :placeholder="localization.info.addTagPlaceholder" class="flows-filter-group__deployment-tags" />
      </p-label>
    </div>

    <div class="flows-filter-group__row">
      <p-label :label="localization.info.schedule">
        <p-select v-model="scheduleActive" :options="scheduleActiveOptions" />
      </p-label>

      <p-label :label="localization.info.workPools">
        <WorkPoolCombobox v-model:selected="filter.workPools.name" :empty-message="localization.info.all" multiple />
      </p-label>
    </div>

    <div class="flows-filter-group__row">
      <p-label :label="localization.info.lastFlowRunState">
        <StateNameSelect v-model:selected="filter.flowRuns.state.name" :empty-message="localization.info.all" multiple />
      </p-label>

      <p-label :label="media.hover ? localization.info.lastFlowRunStart : ''">
        <DateRangeInputWithFlowRunHistory v-model:range="range" />
      </p-label>
    </div>

    <div class="flows-filter-group__row">
      <p-button size="sm" secondary :disabled="isDefaultFilter" @click="clear">
        {{ localization.info.resetFilters }}
      </p-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { media, PLabel } from '@prefecthq/prefect-design'
  import { useDebouncedRef } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { SearchInput, StateNameSelect, WorkPoolCombobox } from '@/components'
  import DateRangeInputWithFlowRunHistory from '@/components/DateRangeInputWithFlowRunHistory.vue'
  import { useFlowsFilterFromRoute } from '@/compositions/filters'
  import { localization } from '@/localization'
  import { isNullish } from '@/utilities'


  const deploymentNameLike = ref<string>()
  const deploymentNameLikeDebounced = useDebouncedRef(deploymentNameLike, 800)

  const scheduleActive = ref(null)
  const scheduleActiveOptions = [
    { label: localization.info.all, value: null },
    { label: localization.info.active, value: true },
    { label: localization.info.inactive, value: false },
  ]

  const isScheduleActive = computed(() => {
    if (isNullish(scheduleActive.value)) {
      return undefined
    }
    return scheduleActive.value
  })

  const nameLike = computed(() => {
    return deploymentNameLikeDebounced.value === '' ? undefined : deploymentNameLikeDebounced.value
  })

  const { filter, isDefaultFilter, clear } = useFlowsFilterFromRoute({
    deployments: {
      nameLike,
      isScheduleActive,
    },
  })

  const range = computed<[Date, Date]>({
    get() {
      return [filter.flowRuns.expectedStartTimeAfter!, filter.flowRuns.expectedStartTimeBefore!]
    },
    set([expectedStartTimeAfter, expectedStartTimeBefore]) {
      filter.flowRuns.expectedStartTimeAfter = expectedStartTimeAfter
      filter.flowRuns.expectedStartTimeBefore = expectedStartTimeBefore
    },
  })
</script>

<style>
.flows-filter-group { @apply
  flex
  flex-col
  gap-4
}

.flows-filter-group__row { @apply
  flex
  flex-wrap
  md:flex-nowrap
  gap-4
  justify-end
}

.flows-filter-group__search { @apply
  md:hidden
}

.flows-filter-group__date { @apply
  flex
  flex-wrap
  justify-center
  gap-1
}

.flows-filter-group__date-value { @apply
  w-full
}

.flows-filter-group__deployment-tags--empty { @apply
  text-foreground-50
}
</style>
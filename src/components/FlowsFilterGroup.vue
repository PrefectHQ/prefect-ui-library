<template>
  <div class="flows-filter-group">
    <div class="flows-filter-group__row">
      <p-label :label="localization.info.deploymentTags">
        <DeploymentTagsInput
          v-model:selected="filter.flowRuns.tags.name"
          :filter="filter"
          class="flows-filter-group__deployment-tags"
        />
      </p-label>

      <p-label :label="localization.info.schedule">
        <p-select v-model="scheduleActive" :options="scheduleActiveOptions" />
      </p-label>

      <p-label :label="localization.info.workPools">
        <WorkPoolCombobox v-model:selected="filter.workPools.name" :empty-message="localization.info.all" multiple />
      </p-label>
    </div>

    <!-- These filters aren't quite right yet - working with the API get the proper ones stood up -->
    <template v-if="false">
      <div class="flows-filter-group__row">
        <p-label :label="localization.info.lastFlowRunState">
          <StateNameSelect v-model:selected="filter.flowRuns.state.name" disabled :empty-message="localization.info.all" multiple />
        </p-label>

        <p-label :label="media.hover ? localization.info.lastFlowRunStart : ''">
          <DateRangeInputWithFlowRunHistory v-model:range="range" />
        </p-label>
      </div>
    </template>

    <div class="flows-filter-group__row">
      <p-button size="sm" secondary :disabled="isDefaultFilter" @click="clear">
        {{ localization.info.resetFilters }}
      </p-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { media, PLabel } from '@prefecthq/prefect-design'
  import { computed, ref } from 'vue'
  import { DeploymentTagsInput, StateNameSelect, WorkPoolCombobox } from '@/components'
  import DateRangeInputWithFlowRunHistory from '@/components/DateRangeInputWithFlowRunHistory.vue'
  import { useFlowsFilterFromRoute } from '@/compositions/filters'
  import { localization } from '@/localization'
  import { isNullish } from '@/utilities'


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


  const { filter, isDefaultFilter, clear } = useFlowsFilterFromRoute({
    deployments: {

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
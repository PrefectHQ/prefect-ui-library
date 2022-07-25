<template>
  <StateListItem v-model:selected="model" v-bind="{ value, disabled, tags, stateType }" class="flow-run-list-item">
    <template #name>
      <FlowRouterLink :flow-id="flowRun.flowId" after=" / " />
      <router-link class="flow-run-list-item__link" :to="flowRunRoute(flowRun.id)">
        <span>{{ flowRun.name }}</span>
      </router-link>
    </template>
    <template #meta>
      <StateBadge :state="flowRun.state" />
      <DurationIconText :duration="flowRun.duration" />
      <FlowRunStartTime :flow-run="flowRun" />
      <template v-if="tasksCount.response">
        <p-icon-text icon="Task">
          {{ tasksCount.response }} task {{ toPluralString('run', tasksCount.response) }}
        </p-icon-text>
      </template>
    </template>
  </StateListItem>
</template>

<script lang="ts" setup>
  import { CheckboxModel } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { RouterLink } from 'vue-router'
  import DurationIconText from './DurationIconText.vue'
  import FlowRouterLink from './FlowRouterLink.vue'
  import FlowRunStartTime from '@/components/FlowRunStartTime.vue'
  import StateBadge from '@/components/StateBadge.vue'
  import StateListItem from '@/components/StateListItem.vue'
  import { FlowRun } from '@/models/FlowRun'
  import { flowRunRouteKey } from '@/router'
  import { taskRunsApiKey } from '@/services/TaskRunsApi'
  import { inject, toPluralString } from '@/utilities'

  const props = defineProps<{
    selected: CheckboxModel | null,
    flowRun: FlowRun,
    disabled?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: CheckboxModel): void,
  }>()

  const model = computed({
    get() {
      return props.selected ?? undefined
    },
    set(value: CheckboxModel) {
      emit('update:selected', value)
    },
  })
  const flowRunRoute = inject(flowRunRouteKey)
  const taskRunsApi = inject(taskRunsApiKey)

  const stateType = computed(() => props.flowRun.state?.type)
  const tags = computed(() => props.flowRun.tags)
  const value = computed(() => props.flowRun.id)

  const tasksCountFilter = computed(() => ({
    flow_runs: {
      id: {
        any_: [props.flowRun.id],
      },
    },
  }))

  const tasksCount = useSubscription(taskRunsApi.getTaskRunsCount, [tasksCountFilter])
</script>

<style>
.flow-run-list-item__link { @apply
  font-semibold
  text-prefect-500
}
</style>
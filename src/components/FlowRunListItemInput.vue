<template>
  <StateListItemInput v-model:selected="model" v-bind="{ value, disabled, tags, stateType }" class="flow-run-list-item-input">
    <template #name>
      <span>{{ flowRun.name }}</span>
    </template>
    <template #meta>
      <StateBadge :state="flowRun.state" />
      <p-icon-text icon="ClockIcon">
        {{ secondsToApproximateString(flowRun.duration) }}
      </p-icon-text>
      <FlowRunListItemDate :flow-run="flowRun" />
      <template v-if="tasksCount.response">
        <p-icon-text icon="Task">
          {{ tasksCount.response }} task runs
        </p-icon-text>
      </template>
    </template>
  </StateListItemInput>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import FlowRunListItemDate from './FlowRunListItemDate.vue'
  import StateListItemInput from './StateListItemInput.vue'
  import StateBadge from '@/components/StateBadge.vue'
  import { FlowRun } from '@/models/FlowRun'
  import { taskRunsApiKey } from '@/services/TaskRunsApi'
  import { inject } from '@/utilities'
  import { secondsToApproximateString } from '@/utilities/seconds'

  type Selected = boolean | unknown[] | undefined

  const props = defineProps<{
    selected: Selected | null,
    value: unknown,
    flowRun: FlowRun,
    disabled?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: Selected): void,
  }>()

  const model = computed({
    get() {
      return props.selected ?? undefined
    },
    set(value: Selected) {
      emit('update:selected', value)
    },
  })

  const stateType = computed(() => props.flowRun.state?.type)
  const tags = computed(() => props.flowRun.tags)

  const taskRunsApi = inject(taskRunsApiKey)

  const tasksCountFilter = computed(() => ({
    flow_runs: {
      id: {
        any_: [props.flowRun.id],
      },
    },
  }))

  const tasksCount = useSubscription(taskRunsApi.getTaskRunsCount, [tasksCountFilter])
</script>
<template>
  <StateListItem v-model:selected="model" v-bind="{ value, disabled, tags, stateType }" class="flow-run-list-item">
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
  </StateListItem>
</template>

<script lang="ts" setup>
  import { CheckboxModel } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import FlowRunListItemDate from '@/components/FlowRunListItemDate.vue'
  import StateListItem from '@/components/StateListItem.vue'
  import StateBadge from '@/components/StateBadge.vue'
  import { FlowRun } from '@/models/FlowRun'
  import { taskRunsApiKey } from '@/services/TaskRunsApi'
  import { inject } from '@/utilities'
  import { secondsToApproximateString } from '@/utilities/seconds'

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

  const stateType = computed(() => props.flowRun.state?.type)
  const tags = computed(() => props.flowRun.tags)
  const value = computed(() => props.flowRun.id)

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
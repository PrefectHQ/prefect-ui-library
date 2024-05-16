<template>
  <div ref="el" class="task-run-list-item">
    <StateListItem v-model:selected="model" v-bind="{ selectable, value, tags, stateType }">
      <template #name>
        <div class="task-run-list-item__breadcrumbs">
          <template v-if="showFlow && flow">
            <p-link :to="routes.flow(flow.id)">
              {{ flow.name }}
            </p-link>
            <p-icon icon="ChevronRightIcon" size="small" />
          </template>

          <template v-if="showFlowRun && flowRun">
            <p-link :to="routes.flowRun(flowRun.id)">
              {{ flowRun.name }}
            </p-link>
            <p-icon icon="ChevronRightIcon" size="small" />
          </template>

          <p-link :to="routes.taskRun(taskRun.id)">
            <span>{{ taskRun.name }}</span>
          </p-link>
        </div>
      </template>
      <template #meta>
        <StateBadge :state="taskRun.state" />
        <p-icon-text icon="ClockIcon">
          {{ secondsToApproximateString(taskRun.duration) }}
        </p-icon-text>
        <p-icon-text class="flow-run-date-icon-text" icon="CalendarIcon">
          <template v-if="taskRun.startTime">
            {{ formatDateTimeNumeric(taskRun.startTime) }}
          </template>
          <template v-else-if="taskRun.expectedStartTime">
            {{ formatDateTimeNumeric(taskRun.expectedStartTime) }}
          </template>
        </p-icon-text>
      </template>

      <template v-if="showFlowRun && visible" #relationships>
        <FlowRunDeployment v-if="flowRun?.deploymentId" :deployment-id="flowRun.deploymentId" />
        <FlowRunWorkPool v-if="flowRun?.workPoolName" :work-pool-name="flowRun.workPoolName" />
        <FlowRunWorkQueue
          v-if="flowRun?.workQueueName"
          :work-queue-name="flowRun.workQueueName"
          :work-pool-name="flowRun.workPoolName"
          :flow-run-state="flowRun.stateType"
        />
      </template>
    </StateListItem>
  </div>
</template>

<script lang="ts" setup>
  import { CheckboxModel } from '@prefecthq/prefect-design'
  import { useIntersectionObserver } from '@prefecthq/vue-compositions'
  import { computed, onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import FlowRunDeployment from '@/components/FlowRunDeployment.vue'
  import FlowRunWorkPool from '@/components/FlowRunWorkPool.vue'
  import FlowRunWorkQueue from '@/components/FlowRunWorkQueue.vue'
  import StateBadge from '@/components/StateBadge.vue'
  import StateListItem from '@/components/StateListItem.vue'
  import { useFlow, useFlowRun, useWorkspaceRoutes } from '@/compositions'
  import { TaskRun } from '@/models/TaskRun'
  import { formatDateTimeNumeric } from '@/utilities/dates'
  import { secondsToApproximateString } from '@/utilities/seconds'

  const props = defineProps<{
    selectable?: boolean,
    selected?: CheckboxModel | null,
    taskRun: TaskRun,
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

  const route = useRoute()
  const routes = useWorkspaceRoutes()
  const stateType = computed(() => props.taskRun.state?.type)
  const tags = computed(() => props.taskRun.tags)
  const value = computed(() => props.taskRun.id)

  const { flowRun } = useFlowRun(props.taskRun.flowRunId)
  const isFlowRunRoute = computed(() => route.name === routes.flowRun('').name)
  const showFlowRun = computed(() => props.taskRun.flowRunId && !isFlowRunRoute.value)

  const { flow } = useFlow(() => flowRun.value?.flowId)
  const showFlow = computed(() => props.taskRun.flowRunId && !isFlowRunRoute.value)

  const visible = ref(false)
  const el = ref<HTMLDivElement>()

  function intersect(entries: IntersectionObserverEntry[]): void {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visible.value = true
        disconnect()
      }
    })
  }

  const { observe, disconnect } = useIntersectionObserver(intersect)

  onMounted(() => {
    observe(el)
  })
</script>

<style>
.task-run-list-item__breadcrumbs { @apply
  flex
  items-center
  gap-1
}
</style>
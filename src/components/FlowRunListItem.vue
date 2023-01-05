<template>
  <div ref="el" class="flow-run-list-item">
    <StateListItem v-model:selected="model" v-bind="{ value, disabled, tags, stateType }">
      <template #name>
        <FlowRouterLink :flow-id="flowRun.flowId" class="flow-run-list-item__flow-link">
          <template #after>
            <p-icon icon="ChevronRightIcon" size="small" />
          </template>
        </FlowRouterLink>
        <p-link :to="routes.flowRun(flowRun.id)" class="flow-run-list-item__flow-run-link">
          <span>{{ flowRun.name }}</span>
        </p-link>
      </template>
      <template #meta>
        <StateBadge :state="flowRun.state" />
        <FlowRunStartTime :flow-run="flowRun" />
        <DurationIconText :duration="flowRun.duration" />
        <template v-if="visible && flowRun.stateType !== 'scheduled'">
          <FlowRunTaskCount :tasks-count="tasksCount">
            <template #default="{ count }">
              {{ count }} task {{ toPluralString('run', count) }}
            </template>
          </FlowRunTaskCount>
        </template>
      </template>
      <template v-if="visible && (flowRun.deploymentId || flowRun.workQueueName)" #relationships>
        <template v-if="flowRun.deploymentId">
          <div class="flow-run-list-item__relation">
            <span>Deployment</span> <DeploymentIconText :deployment-id="flowRun.deploymentId" />
          </div>
        </template>
        <template v-if="flowRun.workQueueName || flowRun.workerPoolName">
          <div v-if="flowRun.workerPoolName" class="flow-run-list-item__relation">
            <span>Worker Pool</span>
            <WorkerPoolIconText :worker-pool-name="flowRun.workerPoolName" />
          </div>
          <template v-else>
            <div v-if="flowRun.workQueueName" class="flow-run-list-item__relation">
              <span>Work Queue</span>
              <WorkQueueIconText :work-queue-name="flowRun.workQueueName" />
            </div>
          </template>
        </template>
      </template>
    </StateListItem>
  </div>
</template>

<script lang="ts" setup>
  import { CheckboxModel } from '@prefecthq/prefect-design'
  import { useIntersectionObserver } from '@prefecthq/vue-compositions'
  import { computed, onMounted, ref } from 'vue'
  import DeploymentIconText from '@/components/DeploymentIconText.vue'
  import DurationIconText from '@/components/DurationIconText.vue'
  import FlowRouterLink from '@/components/FlowRouterLink.vue'
  import FlowRunStartTime from '@/components/FlowRunStartTime.vue'
  import FlowRunTaskCount from '@/components/FlowRunTaskCount.vue'
  import StateBadge from '@/components/StateBadge.vue'
  import StateListItem from '@/components/StateListItem.vue'
  import WorkerPoolIconText from '@/components/WorkerPoolIconText.vue'
  import WorkQueueIconText from '@/components/WorkQueueIconText.vue'
  import { useTaskRunsCount, useWorkspaceRoutes } from '@/compositions'
  import { FlowRun } from '@/models/FlowRun'
  import { toPluralString } from '@/utilities'

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

  const routes = useWorkspaceRoutes()
  const stateType = computed(() => props.flowRun.state?.type)
  const tags = computed(() => props.flowRun.tags)
  const value = computed(() => props.flowRun.id)

  const flowRunId = computed(() => props.flowRun.id)
  const tasksCount = useTaskRunsCount(flowRunId)

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
.flow-run-list-item__flow-link { @apply
  font-semibold
}

.flow-run-list-item__flow-run-link { @apply
  font-normal
}

.flow-run-list-item__relation { @apply
  flex gap-1
}
</style>
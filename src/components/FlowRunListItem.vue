<template>
  <div ref="el" class="flow-run-list-item">
    <StateListItem v-model:selected="model" v-bind="{ selectable, value, tags, stateType }">
      <template #name>
        <FlowRunBreadCrumbs :flow-run="flowRun" />
      </template>
      <template #meta>
        <StateBadge :state="flowRun.state" />
        <FlowRunStartTime :flow-run="flowRun" />
        <DurationIconText :duration="flowRun.duration" />
        <template v-if="visible && flowRun.stateType !== 'scheduled'">
          <FlowRunTaskCount :tasks-count="taskRunsCount" />
        </template>
      </template>
      <template v-if="visible && (flowRun.deploymentId || flowRun.workQueueName)" #relationships>
        <FlowRunDeployment v-if="flowRun.deploymentId" :deployment-id="flowRun.deploymentId" />
        <FlowRunWorkPool v-if="flowRun.workPoolName" :work-pool-name="flowRun.workPoolName" />
        <FlowRunWorkQueue
          v-if="flowRun.workQueueName"
          :work-queue-name="flowRun.workQueueName"
          :work-pool-name="flowRun.workPoolName"
          :flow-run-state="flowRun.stateType"
        />
      </template>
      <slot name="after" :flow-run="flowRun" />
    </StateListItem>
  </div>
</template>

<script lang="ts" setup>
  import { CheckboxModel } from '@prefecthq/prefect-design'
  import { useIntersectionObserver } from '@prefecthq/vue-compositions'
  import { computed, onMounted, ref } from 'vue'
  import DurationIconText from '@/components/DurationIconText.vue'
  import FlowRunBreadCrumbs from '@/components/FlowRunBreadCrumbs.vue'
  import FlowRunDeployment from '@/components/FlowRunDeployment.vue'
  import FlowRunStartTime from '@/components/FlowRunStartTime.vue'
  import FlowRunTaskCount from '@/components/FlowRunTaskCount.vue'
  import FlowRunWorkPool from '@/components/FlowRunWorkPool.vue'
  import FlowRunWorkQueue from '@/components/FlowRunWorkQueue.vue'
  import StateBadge from '@/components/StateBadge.vue'
  import StateListItem from '@/components/StateListItem.vue'
  import { useTaskRunsCount } from '@/compositions'
  import { FlowRun } from '@/models/FlowRun'

  const props = defineProps<{
    selectable?: boolean,
    selected?: CheckboxModel | null,
    flowRun: FlowRun,
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

  const { count: taskRunsCount } = useTaskRunsCount(() => ({
    flowRuns: {
      id: [props.flowRun.id],
    },
  }))

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
.flow-run-list-item__relation { @apply
  flex gap-1
}
</style>
<template>
  <div ref="el">
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
        <template v-if="visible">
          <FlowRunTaskCount :flow-run="flowRun" />
          <template v-if="flowRun.deploymentId">
            <DeploymentIconText :deployment-id="flowRun.deploymentId" />
          </template>
          <template v-if="flowRun.workQueueName">
            <WorkQueueIconText :work-queue-name="flowRun.workQueueName" />
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
  import { RouterLink } from 'vue-router'
  import DeploymentIconText from './DeploymentIconText.vue'
  import DurationIconText from './DurationIconText.vue'
  import FlowRouterLink from './FlowRouterLink.vue'
  import FlowRunTaskCount from './FlowRunTaskCount.vue'
  import WorkQueueIconText from './WorkQueueIconText.vue'
  import FlowRunStartTime from '@/components/FlowRunStartTime.vue'
  import StateBadge from '@/components/StateBadge.vue'
  import StateListItem from '@/components/StateListItem.vue'
  import { FlowRun } from '@/models/FlowRun'
  import { flowRunRouteKey } from '@/router'
  import { inject } from '@/utilities'

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

  const stateType = computed(() => props.flowRun.state?.type)
  const tags = computed(() => props.flowRun.tags)
  const value = computed(() => props.flowRun.id)

  const visible = ref(false)
  const el = ref<HTMLDivElement>()

  function intersect(entries: IntersectionObserverEntry[]): void {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visible.value = entry.isIntersecting
      }
    })
  }

  const { observe } = useIntersectionObserver(intersect)

  onMounted(() => {
    observe(el)
  })
</script>

<style>
.flow-run-list-item__link { @apply
  font-semibold
  text-prefect-500
}
</style>
<template>
  <PPopOver ref="popover" class="flow-run-pop-over">
    <template #target>
      <div ref="trigger" class="flow-run-pop-over__trigger" @mouseover="open" />
    </template>

    <template v-if="flowRun">
      <article ref="content" class="flow-run-popover__content">
        <header class="flow-run-popover__content-header">
          <h5>
            <FlowRouterLink :flow-id="flowRun.flowId" after=" / " />
            <p-link :to="flowRunRoute(flowRun.id)">
              <span>{{ flowRun.name }}</span>
            </p-link>
          </h5>
        </header>

        <StateBadge :state="flowRun.state" class="max-w-min" />

        <p-divider />

        <aside class="flow-run-popover__content-aside">
          <template v-if="flowRun.deploymentId">
            <DeploymentIconText :deployment-id="flowRun.deploymentId" />
          </template>

          <template v-if="flowRun.duration">
            <DurationIconText :duration="flowRun.duration" />
          </template>

          <FlowRunStartTime :flow-run="flowRun" />

          <p-tags class="flow-run-popover__tags" :tags="flowRun.tags ?? []" />
        </aside>
      </article>
    </template>
  </PPopOver>
</template>

<script lang="ts" setup>
  import { PPopOver } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, onMounted, onUnmounted, ref } from 'vue'
  import DeploymentIconText from './DeploymentIconText.vue'
  import DurationIconText from './DurationIconText.vue'
  import FlowRouterLink from './FlowRouterLink.vue'
  import StateBadge from './StateBadge.vue'
  import FlowRunStartTime from '@/components/FlowRunStartTime.vue'
  import { flowRunRouteKey } from '@/router'
  import { flowRunsApiKey } from '@/services/FlowRunsApi'
  import { inject } from '@/utilities/inject'


  const props = defineProps<{
    flowRunId: string,
  }>()

  const flowRunRoute = inject(flowRunRouteKey)
  const popover = ref<typeof PPopOver>()
  const trigger = ref<HTMLDivElement>()
  const content = ref<HTMLDivElement>()
  const flowsRunApi = inject(flowRunsApiKey)
  const flowRunSubscription = useSubscription(flowsRunApi.getFlowRun, [props.flowRunId])
  const flowRun = computed(() => flowRunSubscription.response)

  onMounted(() => {
    document.addEventListener('mouseover', mouseover)
    document.addEventListener('click', click)
  })

  onUnmounted(() => {
    document.removeEventListener('mouseover', mouseover)
    document.removeEventListener('click', click)
  })

  function open(): void {
    if (popover.value) {
      popover.value.open()
    }
  }

  function click(event: MouseEvent): void {
    const target = event.target as HTMLElement

    if (!popover.value || !content.value) {
      return
    }

    if (content.value.contains(target)) {
      return
    }

    popover.value.close()
  }

  function mouseover(event: MouseEvent): void {
    const target = event.target as HTMLElement

    if (!popover.value || !trigger.value) {
      return
    }

    if (trigger.value.contains(target) || !target.classList.contains('flow-run-pop-over__trigger')) {
      return
    }

    popover.value.close()
  }
</script>

<style>
.flow-run-pop-over { @apply
  absolute
  top-[-2px]
  left-[-2px]
  right-[-2px]
  bottom-[-2px]
  rounded-full
  overflow-hidden
  cursor-pointer
}

.flow-run-pop-over__trigger { @apply
  w-full
  h-full
}

.flow-run-popover__content { @apply
  p-3
  grid
  gap-1
  bg-white
  border-[1px]
  border-slate-300
  rounded
  max-w-xs
  w-screen
  shadow-md
}

.flow-run-popover__content-header { @apply
  grid
  gap-1
}

.flow-run-popover__content-aside { @apply
  grid
  gap-2
}

.flow-run-popover__tags {
  @apply
  mt-2
}

.flow-run-popover__tags .p-tag {
  @apply
  !text-xs
}
</style>
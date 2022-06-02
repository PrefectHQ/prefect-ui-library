<template>
  <PPopOver ref="popover" class="flow-run-pop-over">
    <template #target>
      <div ref="trigger" class="flow-run-pop-over__trigger" @mouseover="open" />
    </template>

    <template v-if="flowRun">
      <div ref="content" class="flow-run-popover__content">
        <p-key-value label="Flow Run">
          <template #value>
            <FlowRunIconText :flow-run-id="flowRun.id" />
          </template>
        </p-key-value>
        <p-key-value label="Flow">
          <template #value>
            <FlowIconText :flow-id="flowRun.flowId" />
          </template>
        </p-key-value>
        <p-key-value v-if="flowRun.deploymentId" label="Deployment">
          <template #value>
            <DeploymentIconText :deployment-id="flowRun.deploymentId" />
          </template>
        </p-key-value>
        <template v-if="flowRun.isScheduled()">
          <p-key-value label="Scheduled">
            <template #value>
              <template v-if="flowRun.expectedStartTime">
                {{ formatDateTimeNumeric(flowRun.expectedStartTime) }}
              </template>
            </template>
          </p-key-value>
        </template>
        <template v-else>
          <p-key-value label="Duration">
            <template #value>
              <template v-if="flowRun.duration">
                {{ secondsToString(flowRun.duration) }}
              </template>
            </template>
          </p-key-value>
          <p-key-value label="Start Time">
            <template #value>
              <template v-if="flowRun.startTime">
                {{ formatDateTimeNumeric(flowRun.startTime) }}
              </template>
            </template>
          </p-key-value>
          <p-key-value label="End Time">
            <template #value>
              <template v-if="flowRun.endTime">
                {{ formatDateTimeNumeric(flowRun.endTime) }}
              </template>
            </template>
          </p-key-value>
        </template>
      </div>
    </template>
  </PPopOver>
</template>

<script lang="ts" setup>
  import { PPopOver, secondsToString, formatDateTimeNumeric } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, onMounted, onUnmounted, ref } from 'vue'
  import DeploymentIconText from './DeploymentIconText.vue'
  import FlowIconText from './FlowIconText.vue'
  import FlowRunIconText from './FlowRunIconText.vue'
  import { flowRunsApiKey } from '@/services/FlowRunsApi'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    flowRunId: string,
  }>()

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
  p-2
  grid
  gap-1
  bg-white
  border-[1px]
  border-slate-300
  rounded
}
</style>
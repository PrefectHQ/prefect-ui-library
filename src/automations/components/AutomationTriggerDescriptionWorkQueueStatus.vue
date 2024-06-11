<template>
  <div class="automation-trigger-description-work-queue-status">
    When

    <template v-if="anyWorkQueue">
      any work queue
    </template>

    <template v-else>
      {{ toPluralString("work queue", trigger.workQueues.length) }}

      <template v-for="(workQueue, index) in workQueues" :key="workQueue.id">
        <WorkQueueIconText :work-pool-name="workQueue.workPoolName" :work-queue-name="workQueue.name" />

        <template v-if="index < trigger.workQueues.length - 1">
          or
        </template>
      </template>
    </template>

    <template v-if="!anyWorkPool">
      from the {{ toPluralString("work pool", trigger.workPools.length) }}

      <template v-for="(workPool, index) in workPools" :key="workPool.id">
        <WorkPoolIconText :work-pool-name="workPool.name" />

        <template v-if="index < trigger.workPools.length - 1">
          or
        </template>
      </template>
    </template>

    {{ getAutomationTriggerEventPostureLabel(trigger.posture) }}

    {{ getWorkPoolQueueStatusLabel(trigger.status) }}

    <template v-if="trigger.posture === 'Proactive'">
      for {{ secondsToString(trigger.time) }}
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { toPluralString } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { getAutomationTriggerEventPostureLabel } from '@/automations/types/automationTriggerEvent'
  import { WorkQueueStatusTrigger } from '@/automations/types/workQueueStatusTrigger'
  import WorkPoolIconText from '@/components/WorkPoolIconText.vue'
  import WorkQueueIconText from '@/components/WorkQueueIconText.vue'
  import { useWorkPools } from '@/compositions/useWorkPools'
  import { useWorkQueues } from '@/compositions/useWorkQueues'
  import { getWorkPoolQueueStatusLabel } from '@/models/WorkPoolQueue'
  import { secondsToString } from '@/utilities/seconds'


  const props = defineProps<{
    trigger: WorkQueueStatusTrigger,
  }>()

  const anyWorkPool = computed(() => props.trigger.workPools.length === 0)

  const { workPools } = useWorkPools(() => {
    if (anyWorkPool.value) {
      return null
    }

    return {
      workPools: {
        id: props.trigger.workPools,
      },
    }
  })

  const anyWorkQueue = computed(() => props.trigger.workQueues.length === 0)

  const { workQueues } = useWorkQueues(() => {
    if (anyWorkQueue.value) {
      return null
    }

    return {
      workQueues: {
        id: props.trigger.workQueues,
      },
    }
  })
</script>

<style>
.automation-trigger-description-work-queue-status { @apply
  flex
  flex-wrap
  gap-1
  items-center
}
</style>
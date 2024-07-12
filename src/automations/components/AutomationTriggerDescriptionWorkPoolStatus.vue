<template>
  <div class="automation-trigger-description-work-pool-status">
    When

    <template v-if="anyWorkPool">
      any work pool
    </template>

    <template v-else>
      {{ toPluralString("work pool", trigger.workPools.length) }}

      <template v-for="(workPool, index) in workPools" :key="workPool.id">
        <WorkPoolIconText :work-pool-name="workPool.name" />

        <template v-if="index === trigger.workPools.length - 2">
          or
        </template>
      </template>
    </template>

    {{ getAutomationTriggerEventPostureLabel(trigger.posture) }}

    {{ getWorkPoolStatusLabel(trigger.status).toLowerCase() }}

    <template v-if="trigger.posture === 'Proactive'">
      for {{ secondsToString(trigger.time) }}
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { toPluralString } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { getAutomationTriggerEventPostureLabel } from '@/automations/types/automationTriggerEvent'
  import { WorkPoolStatusTrigger } from '@/automations/types/workPoolStatusTrigger'
  import WorkPoolIconText from '@/components/WorkPoolIconText.vue'
  import { useWorkPools } from '@/compositions'
  import { getWorkPoolStatusLabel } from '@/models/WorkPoolStatus'
  import { secondsToString } from '@/utilities/seconds'

  const props = defineProps<{
    trigger: WorkPoolStatusTrigger,
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
</script>

<style>
.automation-trigger-description-work-pool-status { @apply
  flex
  flex-wrap
  gap-1
  items-center
}
</style>
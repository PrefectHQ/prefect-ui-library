<template>
  <div class="automation-action-description-pause-resume-work-pool">
    <template v-if="action.workPoolId">
      <template v-if="workPool">
        {{ pauseOrResume }} work pool: <WorkPoolIconText :work-pool-name="workPool.name" />
      </template>
    </template>

    <template v-else>
      <span>{{ pauseOrResume }} work pool inferred from the triggering event</span>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { AutomationActionPauseWorkPool, AutomationActionResumeWorkPool } from '@/automations/types/actions'
  import WorkPoolIconText from '@/components/WorkPoolIconText.vue'
  import { useWorkPoolById } from '@/compositions'

  const props = defineProps<{
    action: AutomationActionResumeWorkPool | AutomationActionPauseWorkPool,
  }>()

  const { workPool } = useWorkPoolById(() => props.action.workPoolId)

  const pauseOrResume = computed(() => props.action.type === 'pause-work-pool' ? 'Pause' : 'Resume')
</script>

<style>
.automation-action-description-pause-resume-work-pool { @apply
  flex
  flex-wrap
  gap-1
  items-center
}
</style>
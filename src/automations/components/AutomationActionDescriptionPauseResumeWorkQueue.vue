<template>
  <div class="automation-action-description-pause-resume-work-queue">
    <template v-if="action.workQueueId">
      <template v-if="workPoolQueue">
        {{ pauseOrResume }} work queue: <WorkQueueIconText :work-queue-name="workPoolQueue.name" :work-pool-name="workPoolQueue.workPoolName" />
      </template>
    </template>

    <template v-else>
      <span>{{ pauseOrResume }} work queue inferred from the trigger</span>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { AutomationActionPauseWorkQueue, AutomationActionResumeWorkQueue } from '@/automations/types/actions'
  import WorkQueueIconText from '@/components/WorkQueueIconText.vue'
  import { useWorkPoolQueue } from '@/compositions'

  const props = defineProps<{
    action: AutomationActionResumeWorkQueue | AutomationActionPauseWorkQueue,
  }>()

  const { workPoolQueue } = useWorkPoolQueue(() => props.action.workQueueId)
  const pauseOrResume = computed(() => props.action.type === 'pause-work-queue' ? 'Pause' : 'Resume')
</script>

<style>
.automation-action-description-pause-resume-work-queue { @apply
  flex
  flex-wrap
  gap-1
  items-center
}
</style>
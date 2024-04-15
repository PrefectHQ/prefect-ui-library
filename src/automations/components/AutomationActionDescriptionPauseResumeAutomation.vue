<template>
  <div class="automation-action-description-pause-resume-automation">
    <template v-if="action.automationId">
      {{ pauseOrResume }} automation: <AutomationIconText :automation-id="action.automationId" />
    </template>

    <template v-else>
      <span>{{ pauseOrResume }} automation inferred from the triggering event</span>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import AutomationIconText from '@/automations/components/AutomationIconText.vue'
  import { AutomationActionPauseAutomation, AutomationActionResumeAutomation } from '@/automations/types/actions'

  const props = defineProps<{
    action: AutomationActionResumeAutomation | AutomationActionPauseAutomation,
  }>()

  const pauseOrResume = computed(() => props.action.type === 'pause-automation' ? 'Pause' : 'Resume')
</script>

<style>
.automation-action-description-pause-resume-automation { @apply
  flex
  flex-wrap
  gap-1
  items-center
}
</style>
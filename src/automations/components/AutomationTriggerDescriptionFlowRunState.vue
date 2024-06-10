<template>
  <div class="automation-trigger-description-flow-run-state">
    When any flow run

    <template v-if="trigger.flowIds.length">
      of flow

      <template v-for="(flowId, index) in trigger.flowIds" :key="flowId">
        <FlowIconText :flow-id />

        <template v-if="index < trigger.flowIds.length - 1">
          or
        </template>
      </template>
    </template>

    <template v-if="trigger.tags.length">
      with the tag <p-tag-wrapper :tags="trigger.tags" small />
    </template>

    {{ getAutomationTriggerEventPostureLabel(trigger.posture) }}

    <template v-if="trigger.states.length">
      <template v-for="state in trigger.states" :key="state">
        <StateBadge :state="mapStateNameToStateType(state)" small />
      </template>
    </template>

    <template v-else>
      any state
    </template>

    <template v-if="trigger.posture === 'Proactive'">
      for {{ secondsToString(trigger.time) }}
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { getAutomationTriggerEventPostureLabel } from '@/automations/types/automationTriggerEvent'
  import { FlowRunStateTrigger } from '@/automations/types/flowRunStateTrigger'
  import FlowIconText from '@/components/FlowIconText.vue'
  import StateBadge from '@/components/StateBadge.vue'
  import { mapStateNameToStateType } from '@/utilities'
  import { secondsToString } from '@/utilities/seconds'

  defineProps<{
    trigger: FlowRunStateTrigger,
  }>()
</script>

<style>
.automation-trigger-description-flow-run-state { @apply
  flex
  flex-wrap
  gap-1
  items-center
}
</style>
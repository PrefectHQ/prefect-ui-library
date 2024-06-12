<template>
  <p-content class="automation-trigger-custom-input">
    <template v-if="trigger.type === 'event'">
      <AutomationTriggerCustomEventInput v-model:trigger="trigger" />
    </template>

    <p-message v-else info>
      The custom trigger form view only supports triggers of type <code>event</code>.
      Switch to JSON to configure other trigger types
    </p-message>
  </p-content>
</template>

<script lang="ts" setup>
  import { PContent } from '@prefecthq/prefect-design'
  import AutomationTriggerCustomEventInput from '@/automations/components/AutomationTriggerCustomEventInput.vue'
  import { AutomationTrigger } from '@/automations/types/triggers'

  const trigger = defineModel<AutomationTrigger>('trigger', { required: true })
</script>
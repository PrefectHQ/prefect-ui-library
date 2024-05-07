<template>
  <p-card class="automation-trigger-description">
    {{ label }}
  </p-card>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { getAutomationTriggerTemplate, getAutomationTriggerTemplateLabel } from '@/automations/types'
  import { AutomationTrigger } from '@/automations/types/triggers'

  const props = defineProps<{
    trigger: AutomationTrigger,
  }>()

  const label = computed(() => {
    const template = getAutomationTriggerTemplate(props.trigger)

    return getAutomationTriggerTemplateLabel(template)
  })
</script>

<style>
.automation-trigger-description { @apply
  text-sm
}
</style>
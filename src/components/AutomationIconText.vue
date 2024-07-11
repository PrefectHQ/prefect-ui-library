<template>
  <template v-if="can.read.automation">
    <p-link :to="routes.automation(automationId)" class="automation-icon-text">
      <p-icon-text icon="Automation">
        <span>{{ automationName }}</span>
      </p-icon-text>
    </p-link>
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useCan, useAutomation, useWorkspaceRoutes } from '@/compositions'

  const props = defineProps<{
    automationId: string,
  }>()

  const can = useCan()
  const routes = useWorkspaceRoutes()
  const automationId = computed(() => props.automationId)
  const { automation } = useAutomation(automationId)
  const automationName = computed(() => automation.value?.name)
</script>
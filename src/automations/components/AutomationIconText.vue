<template>
  <p-link :to="routes.automation(automationId)" class="automation-icon-text">
    <p-icon-text icon="Automation">
      <span>{{ automationName }}</span>
    </p-icon-text>
  </p-link>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'

  const props = defineProps<{
    automationId: string,
  }>()

  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()
  const flowRunSubscription = useSubscription(api.automations.getAutomation, [props.automationId])
  const automationName = computed(() => flowRunSubscription.response?.name)
</script>
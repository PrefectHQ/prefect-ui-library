<template>
  <PageHeading class="page-heading-automation" :crumbs="crumbs">
    <template #actions>
      <AutomationToggle :automation="automation" @update="emit('refresh')" />
      <ExploreEventsButton :filter />
      <AutomationMenu :automation="automation" @delete="goToAutomations" />
    </template>
  </PageHeading>
</template>

<script lang="ts" setup>
  import { Crumb } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { Automation } from '@/automations'
  import AutomationToggle from '@/automations/components/AutomationToggle.vue'
  import ExploreEventsButton from '@/components/ExploreEventsButton.vue'
  import PageHeading from '@/components/PageHeading.vue'
  import { useComponent, useWorkspaceRoutes } from '@/compositions'
  import { PartialWorkspaceEventsFilter } from '@/types'

  const props = defineProps<{
    automation: Automation,
  }>()

  const emit = defineEmits<{
    'refresh': [],
  }>()

  const { AutomationMenu } = useComponent()
  const router = useRouter()
  const routes = useWorkspaceRoutes()

  const crumbs = computed<Crumb[]>(() => [
    { text: 'Automations', to: routes.automations() },
    { text: props.automation.name },
  ])

  const filter = computed<PartialWorkspaceEventsFilter>(() => ({
    anyResource: {
      id: [`prefect-cloud.automation.${props.automation.id}`],
    },
  }))

  function goToAutomations(): void {
    router.push(routes.automations())
  }
</script>
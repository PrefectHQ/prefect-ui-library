<template>
  <p-empty-state class="automations-page-empty-state">
    <template #icon>
      <p-icon icon="Automation" />
    </template>

    <template v-if="can.create.automation" #heading>
      Create an automation to get started
    </template>

    <template #description>
      Automations bring reactivity to your data stack and let you configure triggers and actions based on events.
    </template>

    <template #actions>
      <p-button v-if="can.create.automation" primary icon-append="PlusIcon" :to="routes.automationCreate()">
        Add Automation
      </p-button>
      <DocumentationButton :to="localization.docs.automations" />
    </template>
  </p-empty-state>
</template>

<script lang="ts" setup>
  import { PEmptyState, PIcon } from '@prefecthq/prefect-design'
  import DocumentationButton from '@/components/DocumentationButton.vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { localization } from '@/localization'

  const can = useCan()
  const routes = useWorkspaceRoutes()
</script>

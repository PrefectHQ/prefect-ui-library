<template>
  <span v-if="show" class="event-resource-automation-icon-text">
    <template v-if="id && automationName">
      Automation
      <ResourceLink :resource="resource">
        <p-icon-text icon="Automation">
          <span>{{ automationName }}</span>
        </p-icon-text>
      </ResourceLink>
    </template>
    <template v-else>
      {{ resourceId }}
    </template>
  </span>
</template>

<script lang="ts" setup>
  import { isDefined } from '@prefecthq/prefect-design'
  import { computed, toRefs } from 'vue'
  import { useAutomation } from '@/compositions/useAutomation'
  import { useComponent } from '@/compositions/useComponent'
  import { useWorkspaceEventResource } from '@/compositions/useWorkspaceEventResource'
  import { WorkspaceEventResource } from '@/models/workspaceEvent'

  const props = defineProps<{
    resource: WorkspaceEventResource,
  }>()

  const { ResourceLink } = useComponent()

  const { resource } = toRefs(props)
  const { id, name, resourceId } = useWorkspaceEventResource(resource)
  const automationId = computed(() => name.value ? null : id.value)
  const { automation, subscription } = useAutomation(automationId)

  const automationName = computed(() => name.value ?? automation.value?.name)
  const show = computed(() => isDefined(automationName.value) || subscription.errored)
</script>
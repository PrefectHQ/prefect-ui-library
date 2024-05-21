<template>
  <span v-if="show" class="event-resource-task-run-icon-text">
    <template v-if="id && taskRunName">
      Task run
      <ResourceLink :resource="resource">
        <p-icon-text icon="MapPinIcon">
          <span>{{ taskRunName }}</span>
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
  import { useComponent } from '@/compositions/useComponent'
  import { useTaskRun } from '@/compositions/useTaskRun'
  import { useWorkspaceEventResource } from '@/compositions/useWorkspaceEventResource'
  import { WorkspaceEventResource } from '@/models/workspaceEvent'

  const props = defineProps<{
    resource: WorkspaceEventResource,
  }>()

  const { ResourceLink } = useComponent()

  const { resource } = toRefs(props)
  const { id, name, resourceId } = useWorkspaceEventResource(resource)
  const taskRunId = computed(() => name.value ? null : id.value)
  const { taskRun, subscription } = useTaskRun(taskRunId)

  const taskRunName = computed(() => name.value ?? taskRun.value?.name)
  const show = computed(() => isDefined(taskRunName.value) || subscription.errored)
</script>
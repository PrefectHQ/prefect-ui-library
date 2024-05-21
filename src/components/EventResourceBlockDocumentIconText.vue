<template>
  <span v-if="show" class="event-resource-task-run-icon-text">
    <template v-if="id && blockDocumentName">
      Block
      <ResourceLink :resource="resource">
        <p-icon-text icon="CubeIcon">
          <span>{{ blockDocumentName }}</span>
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
  import ResourceLink from '@/components/ResourceLink.vue'
  import { useBlockDocument } from '@/compositions/useBlockDocument'
  import { useWorkspaceEventResource } from '@/compositions/useWorkspaceEventResource'
  import { WorkspaceEventResource } from '@/models/api/workspaceEvents'

  const props = defineProps<{
    resource: WorkspaceEventResource,
  }>()

  const { resource } = toRefs(props)
  const { id, name, resourceId } = useWorkspaceEventResource(resource)
  const blockDocumentId = computed(() => name.value ? null : id.value)
  const { blockDocument, subscription } = useBlockDocument(blockDocumentId)

  const blockDocumentName = computed(() => name.value ?? blockDocument.value?.name)
  const show = computed(() => isDefined(blockDocumentName.value) || subscription.errored)
</script>
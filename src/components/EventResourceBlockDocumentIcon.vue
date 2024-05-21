<template>
  <div class="event-resource-block-document-icon">
    <template v-if="blockTypeLogo">
      <img :src="blockTypeLogo" class="event-resource-block-document-icon__logo">
    </template>
    <template v-else>
      <p-icon icon="CubeIcon" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed, toRefs } from 'vue'
  import { useBlockDocument } from '@/compositions/useBlockDocument'
  import { useWorkspaceEventResource } from '@/compositions/useWorkspaceEventResource'
  import { WorkspaceEventResource } from '@/models/workspaceEvent'

  const props = defineProps<{
    resource: WorkspaceEventResource,
  }>()

  const { resource } = toRefs(props)
  const { id: blockDocumentId } = useWorkspaceEventResource(resource)
  const { blockDocument } = useBlockDocument(blockDocumentId)
  const blockTypeLogo = computed(() => blockDocument.value?.blockType.logoUrl)
</script>

<style>
.event-resource-block-document-icon__logo { @apply
  bg-white
  dark:text-inverse
  rounded-full;
  padding: 3px;
  transform: scale(1.5);
}
</style>
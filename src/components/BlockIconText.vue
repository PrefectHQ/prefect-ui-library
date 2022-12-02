<template>
  <p-link :to="routes.block(blockDocumentId)" class="block-icon-text">
    <p-icon-text icon="CubeIcon">
      <span>{{ blockName }}</span>
    </p-icon-text>
  </p-link>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'

  const props = defineProps<{
    blockDocumentId: string,
  }>()

  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()
  const blockSubscription = useSubscription(api.blockDocuments.getBlockDocument, [props.blockDocumentId])
  const blockName = computed(() => blockSubscription.response?.name)
</script>
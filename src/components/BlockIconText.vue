<template>
  <p-link :to="blockRoute(blockDocumentId)" class="block-icon-text">
    <p-icon-text icon="CubeIcon">
      <span>{{ blockName }}</span>
    </p-icon-text>
  </p-link>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions'
  import { blockRouteKey } from '@/router/routes'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    blockDocumentId: string,
  }>()

  const blockRoute = inject(blockRouteKey)

  const api = useWorkspaceApi()
  const blockSubscription = useSubscription(api.blockDocuments.getBlockDocument, [props.blockDocumentId])
  const blockName = computed(() => blockSubscription.response?.name)
</script>
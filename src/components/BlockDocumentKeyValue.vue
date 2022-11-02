<template>
  <template v-if="blockDocument">
    <PKeyValue class="block-document-key-value" :label="blockDocument.blockType.name">
      <template #value>
        <p-link :to="blockRoute(blockDocument.id)">
          {{ blockDocument.name }}
        </p-link>
      </template>
    </PKeyValue>
  </template>
</template>

<script lang="ts" setup>
  import { PKeyValue } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
  import { blockRouteKey } from '@/router'
  import { inject } from '@/utilities'

  const props = defineProps<{
    blockDocumentId: string,
  }>()

  const blockRoute = inject(blockRouteKey)
  const api = useWorkspaceApi()
  const blockDocumentSubscription = useSubscription(api.blockDocuments.getBlockDocument, [props.blockDocumentId])
  const blockDocument = computed(() => blockDocumentSubscription.response)
</script>
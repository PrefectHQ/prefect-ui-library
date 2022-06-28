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
  import { blockRouteKey } from '@/router'
  import { blockDocumentsApiKey } from '@/services'
  import { inject } from '@/utilities'

  const props = defineProps<{
    blockDocumentId: string,
  }>()

  const blockRoute = inject(blockRouteKey)
  const blockDocumentsApi = inject(blockDocumentsApiKey)
  const blockDocumentSubscription = useSubscription(blockDocumentsApi.getBlockDocument, [props.blockDocumentId])
  const blockDocument = computed(() => blockDocumentSubscription.response)
</script>
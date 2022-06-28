<template>
  <div>
    <template v-if="blockDocument">
      <slot :block-document="blockDocument" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { blockDocumentsApiKey } from '@/services'
  import { inject } from '@/utilities'

  const props = defineProps<{
    blockDocumentId: string,
  }>()

  const blockDocumentsApi = inject(blockDocumentsApiKey)

  const blockDocumentSubscription = useSubscription(blockDocumentsApi.getBlockDocument, [props.blockDocumentId])
  const blockDocument = computed(() => blockDocumentSubscription.response)
</script>
<template>
  <div class="schema-property-block-key-value">
    <PKeyValue class="block-document-key-value" :label="property.title">
      <template v-if="blockDocument" #value>
        <template v-if="blockDocument">
          <p-link :to="routes.block(blockDocument.id)">
            {{ blockDocument.name }}
          </p-link>
        </template>
      </template>
    </PKeyValue>
  </div>
</template>

<script lang="ts" setup>
  import { PKeyValue, PLink } from '@prefecthq/prefect-design'
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { BlockDocumentValue } from '@/models/api/BlockDocumentCreateRequest'
  import { SchemaProperty } from '@/types'

  const props = defineProps<{
    property: SchemaProperty,
    value: BlockDocumentValue,
  }>()

  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()
  const args = computed<[string] | null>(() => {
    if (props.value.blockDocumentId) {
      return [props.value.blockDocumentId]
    }

    return null
  })
  const subscription = useSubscriptionWithDependencies(api.blockDocuments.getBlockDocument, args)
  const blockDocument = computed(() => subscription.response)
</script>
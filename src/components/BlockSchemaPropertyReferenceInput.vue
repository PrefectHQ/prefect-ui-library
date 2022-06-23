<template>
  <p-label class="block-schema-property-reference-input" :label="blockTypeName">
    <div class="block-schema-property-reference-input__content">
      <BlockTypeLogo v-if="blockType" :block-type="blockType" />

      <template v-if="blockDocuments.length">
        <BlockDocumentsSelect v-model:selected="model" :block-documents="blockDocuments" class="block-schema-property-reference-input__select" />
      </template>

      <router-link :to="blockCatalogCreateRoute(blockTypeName)">
        <p-button inset>
          Add <p-icon icon="PlusIcon" />
        </p-button>
      </router-link>
    </div>
  </p-label>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import BlockDocumentsSelect from './BlockDocumentsSelect.vue'
  import BlockTypeLogo from './BlockTypeLogo.vue'
  import { blockCatalogCreateRouteKey } from '@/router/routes'
  import { blockTypesApiKey } from '@/services'
  import { inject } from '@/utilities'

  const props = defineProps<{
    selected: string | null | undefined,
    blockTypeName: string,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: string | null): void,
  }>()

  const model = computed({
    get() {
      return props.selected ?? null
    },
    set(value: string | null) {
      emit('update:selected', value)
    },
  })

  const blockCatalogCreateRoute = inject(blockCatalogCreateRouteKey)
  const blockTypesApi = inject(blockTypesApiKey)

  const blockTypeSubscription = useSubscription(blockTypesApi.getBlockTypeByName, [props.blockTypeName])
  const blockType = computed(() => blockTypeSubscription.response)
  const blockDocumentsSubscription = useSubscription(blockTypesApi.getBlockDocumentsByBlockTypeName, [props.blockTypeName])
  const blockDocuments = computed(() => blockDocumentsSubscription.response ?? [])
</script>

<style>
.block-schema-property-reference-input__content { @apply
  flex
  gap-2
}

.block-schema-property-reference-input__select { @apply
  grow
}
</style>
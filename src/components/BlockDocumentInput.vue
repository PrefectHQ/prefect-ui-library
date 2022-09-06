<template>
  <div class="block-document-input">
    <BlockTypeLogo v-if="blockType" :block-type="blockType" />

    <template v-if="blockDocuments.length">
      <BlockDocumentsSelect v-model:selected="model" v-bind="{ blockDocuments }" class="block-document-input__select" />
    </template>
    <router-link v-if="blockTypeSlug" :to="blockCatalogCreateRoute(blockTypeSlug)">
      <p-button inset>
        Add <p-icon icon="PlusIcon" />
      </p-button>
    </router-link>
  </div>
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
    modelValue: string | null | undefined,
    blockTypeSlug: string,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: string | null | undefined): void,
  }>()

  const model = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value: string | null | undefined) {
      emit('update:selected', value)
    },
  })

  const blockCatalogCreateRoute = inject(blockCatalogCreateRouteKey)
  const blockTypesApi = inject(blockTypesApiKey)

  const blockTypeSlug = computed(() => props.blockTypeSlug)
  const blockTypeSubscription = useSubscription(blockTypesApi.getBlockTypeBySlug, [blockTypeSlug])
  const blockType = computed(() => blockTypeSubscription.response)
  const blockDocumentsSubscription = useSubscription(blockTypesApi.getBlockDocumentsByBlockTypeSlug, [blockTypeSlug])
  const blockDocuments = computed(() => blockDocumentsSubscription.response ?? [])
</script>

<style>
.block-document-input { @apply
  flex
  items-center
  gap-2
}

.block-document-input__select { @apply
  grow
}
</style>
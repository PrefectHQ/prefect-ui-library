<template>
  <div class="block-capability-block-document-input">
    <BlockTypeLogo v-if="blockDocument" :block-type="blockDocument.blockType" />

    <BlockDocumentsSelect v-model:selected="internalModalValue" class="block-capability-block-document-input__select" :block-documents="blockDocuments" required />

    <p-button inset :to="withQuery(routes.blocksCatalog(), { capability })">
      Add <p-icon icon="PlusIcon" />
    </p-button>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed, toRefs } from 'vue'
  import BlockDocumentsSelect from '@/components/BlockDocumentsSelect.vue'
  import BlockTypeLogo from '@/components/BlockTypeLogo.vue'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { BlockDocumentFilter } from '@/models'
  import { BlockTypeFilter } from '@/models/BlockTypeFilter'
  import { withQuery } from '@/utilities'

  const props = defineProps<{
    modelValue: string | null | undefined,
    capability: string,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string | null | undefined): void,
  }>()

  const { capability } = toRefs(props)
  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()

  const internalModalValue = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })
  const blockDocumentArgs = computed<[string] | null>(() => {
    if (!props.modelValue) {
      return null
    }

    return [props.modelValue]
  })
  const blockDocumentSubscription = useSubscriptionWithDependencies(api.blockDocuments.getBlockDocument, blockDocumentArgs)
  const blockDocument = computed(() => blockDocumentSubscription.response)

  const blockTypeFilter = computed<BlockTypeFilter>(() => ({
    blockSchemas: {
      blockCapabilities: {
        all_: [capability.value],
      },
    },
  }))
  const blockTypesSubscription = useSubscription(api.blockTypes.getBlockTypes, [blockTypeFilter])
  const blockTypes = computed(() => blockTypesSubscription.response ?? [])
  const blockTypeSlugs = computed(() => blockTypes.value.map(blockType => blockType.slug))

  const blockDocumentFilter = computed<[BlockDocumentFilter] | null>(() => {
    if (blockTypeSlugs.value.length == 0) {
      return null
    }

    const filter: BlockDocumentFilter = {
      blockTypes: {
        slug: blockTypeSlugs.value,
      },
    }

    return [filter]
  })
  const blockDocumentsSubscription = useSubscriptionWithDependencies(api.blockDocuments.getBlockDocuments, blockDocumentFilter)
  const blockDocuments = computed(() => blockDocumentsSubscription.response ?? [])
</script>

<style>
.block-capability-block-document-input { @apply
  flex
  items-center
  gap-2
}

.block-capability-block-document-input__select { @apply
  grow
}
</style>
<template>
  <div class="block-capability-block-document-input" :class="classes" :style="styles" v-bind="listeners">
    <p-select v-model="modalValue" v-bind="attrs" :options="options" class="block-capability-block-document-input__select">
      <template #default="{ label, value }">
        <div class="block-capability-block-document-input__option">
          <template v-if="value === blockDocument?.id">
            <BlockTypeLogo v-if="blockDocument" :block-type="blockDocument.blockType" class="block-capability-block-document-input__logo" />
          </template>
          {{ label }}
        </div>
      </template>
      <template #group="{ group }">
        <div class="block-capability-block-document-input__group">
          <BlockTypeLogo :block-type="group.blockType" class="block-capability-block-document-input__logo" />
          {{ group.label }}
        </div>
      </template>
    </p-select>

    <p-button inset :to="withQuery(routes.blocksCatalog(), { capability })">
      Add <p-icon icon="PlusIcon" />
    </p-button>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'BlockCapabilityBlockDocumentInput',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { SelectOptionGroup, useAttrsStylesClassesAndListeners } from '@prefecthq/prefect-design'
  import { useSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed, toRefs } from 'vue'
  import BlockTypeLogo from '@/components/BlockTypeLogo.vue'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { BlockType } from '@/models'
  import { BlockDocumentsFilter, BlockTypesFilter } from '@/models/Filters'
  import { mapper } from '@/services'
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
  const { classes, styles, listeners, attrs } = useAttrsStylesClassesAndListeners()

  const modalValue = computed({
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

  const blockTypeFilter = computed<BlockTypesFilter>(() => ({
    blockSchemas: {
      blockCapabilities: [capability.value],
    },
  }))
  const blockTypesSubscription = useSubscription(api.blockTypes.getBlockTypes, [blockTypeFilter])
  const blockTypes = computed(() => blockTypesSubscription.response ?? [])
  const blockTypeSlugs = computed(() => blockTypes.value.map(blockType => blockType.slug))

  const blockDocumentFilter = computed<[BlockDocumentsFilter] | null>(() => {
    if (blockTypeSlugs.value.length == 0) {
      return null
    }

    const filter: BlockDocumentsFilter = {
      blockTypes: {
        slug: blockTypeSlugs.value,
      },
    }

    return [filter]
  })
  const blockDocumentsSubscription = useSubscriptionWithDependencies(api.blockDocuments.getBlockDocuments, blockDocumentFilter)
  const blockDocuments = computed(() => {
    const documents = blockDocumentsSubscription.response ?? []

    if (blockDocument.value && !documents.some(document => document.id === blockDocument.value?.id)) {
      documents.push({
        ...blockDocument.value,
        name: 'Anonymous Block',
      })
    }

    return documents
  })

  const options = computed<SelectOptionGroup[]>(() => blockTypes.value.flatMap(blockType => {
    const documents = blockDocuments.value.filter(blockDocument => blockDocument.blockTypeId === blockType.id)

    if (documents.length === 0) {
      return []
    }

    const group: SelectOptionGroup & { blockType: BlockType } = {
      blockType,
      label: blockType.name,
      options: mapper.map('BlockDocument', documents, 'SelectOption'),
    }

    return group
  }))
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

.block-capability-block-document-input__group,
.block-capability-block-document-input__option { @apply
  flex
  gap-2
  items-center
}

.block-capability-block-document-input__logo { @apply
  w-5
  h-5
}
</style>
<template>
  <div class="block-capability-block-document-input" :class="classes" :style="styles" v-bind="listeners">
    <p-select v-model="internalModelValue" v-bind="attrs" :options="options" class="block-capability-block-document-input__select">
      <template #default="{ label, value }">
        <div class="block-capability-block-document-input__option">
          <template v-if="value === blockDocument?.id">
            <LogoImage v-if="blockDocument" :url="blockDocument.blockType.logoUrl" class="block-capability-block-document-input__logo" />
          </template>
          {{ label }}
        </div>
      </template>
      <template #group="{ group }">
        <div class="block-capability-block-document-input__group">
          <LogoImage v-if="group.blockType" :url="group.blockType.logoUrl" class="block-capability-block-document-input__logo" />
          {{ group.label }}
        </div>
      </template>
    </p-select>

    <p-button v-if="useModal" icon-append="PlusIcon" @click="open">
      Add
    </p-button>
    <p-button v-else icon-append="PlusIcon" :to="withQuery(routes.blocksCatalog(), { capability })">
      Add
    </p-button>
    <BlockCreateModal v-model:showModal="showModal" :capability="capability" @refresh="handleRefresh" />
  </div>
</template>

<script lang="ts" setup>
  import { SelectOptionGroup, useAttrsStylesClassesAndListeners } from '@prefecthq/prefect-design'
  import { useSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed, toRefs } from 'vue'
  import BlockCreateModal from '@/components/BlockCreateModal.vue'
  import LogoImage from '@/components/LogoImage.vue'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { useShowModal } from '@/compositions/useShowModal'
  import { BlockType, BlockDocument } from '@/models'
  import { BlockDocumentsFilter, BlockTypesFilter } from '@/models/Filters'
  import { mapper } from '@/services'
  import { withQuery } from '@/utilities'

  defineOptions({
    inheritAttrs: false,
  })

  const props = defineProps<{
    modelValue: string | null | undefined,
    capability: string,
    useModal?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string | null | undefined): void,
  }>()

  const { capability } = toRefs(props)
  const api = useWorkspaceApi()
  const { classes, styles, listeners, attrs } = useAttrsStylesClassesAndListeners()
  const { showModal, open, close } = useShowModal()
  const routes = useWorkspaceRoutes()

  const internalModelValue = computed({
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

  const handleRefresh = async (blockDocument: BlockDocument): Promise<void> => {
    internalModelValue.value = blockDocument.id
    await Promise.all([
      blockTypesSubscription.refresh(),
      blockDocumentsSubscription.refresh(),
    ])
    close()
  }
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
<template>
  <p-modal v-model:showModal="internalShowModal" class="block-create-modal" :class="modalClass" title="Add a new block">
    <BlockTypeList
      v-if="!blockType"
      :capability="capability"
      class="block-create-modal__block-type-list"
      use-emit
      :block-types="filteredBlockTypes"
      @add="handleAdd"
    />

    <template v-if="blockType">
      <BlockSchemaCreateForm v-if="blockSchema" :key="blockSchema.id" :block-schema="blockSchema" @cancel="cancel" @submit="submit" />
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { useSubscriptionWithDependencies, useSubscription } from '@prefecthq/vue-compositions'
  import { ref, computed } from 'vue'
  import BlockSchemaCreateForm from '@/components/BlockSchemaCreateForm.vue'
  import BlockTypeList from '@/components/BlockTypeList.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { useBlockTypesFilter } from '@/compositions/filters'
  import { localization } from '@/localization'
  import { BlockDocument } from '@/models/BlockDocument'
  import { BlockDocumentCreateNamed } from '@/models/BlockDocumentCreate'
  import { BlockType } from '@/models/BlockType'
  import { getApiErrorMessage } from '@/utilities/errors'


  const api = useWorkspaceApi()

  const props = defineProps<{
    showModal: boolean,
    providedBlockType?: BlockType,
    capability?: string,
  }>()

  const emit = defineEmits<{
    (event: 'update:showModal', value: boolean): void,
    (event: 'refresh', value: BlockDocument): void,
  }>()

  const blockType = ref(props.providedBlockType)
  const capability = ref(props.capability ?? '')


  const modalClass = computed(() => {
    if (blockType.value) {
      return 'block-create-modal--schema-creation'
    }
    return ''
  })

  const handleAdd = (selectedBlockType: BlockType): void => {
    blockType.value = selectedBlockType
  }

  const internalShowModal = computed({
    get() {
      return props.showModal
    },
    set(value: boolean) {
      blockType.value = props.providedBlockType
      emit('update:showModal', value)
    },
  })

  const cancel = (): void => {
    internalShowModal.value = false
  }

  const { filter } = useBlockTypesFilter({
    blockSchemas: {
      blockCapabilities: [capability.value],
    },
  })
  const blockTypesSubscription = useSubscription(api.blockTypes.getBlockTypes, [filter])
  const blockTypes = computed(() => blockTypesSubscription.response ?? [])
  const filteredBlockTypes = computed(() => [...blockTypes.value].filter(blockType => blockType.name !== 'Slack Incoming Webhook'))

  const blockSchemaSubscriptionArgs = computed<Parameters<typeof api.blockSchemas.getBlockSchemaForBlockType> | null>(() => {
    if (!blockType.value) {
      return null
    }
    return [blockType.value.id]
  })

  const blockSchemaSubscription = useSubscriptionWithDependencies(api.blockSchemas.getBlockSchemaForBlockType, blockSchemaSubscriptionArgs)
  const blockSchema = computed(() => blockSchemaSubscription.response)

  const submit = async (request: BlockDocumentCreateNamed): Promise<void> => {
    try {
      const blockDocument = await api.blockDocuments.createBlockDocument(request)
      emit('refresh', blockDocument)
    } catch (error) {
      console.error(error)
      const message = getApiErrorMessage(error, localization.error.createBlock)
      showToast(message, 'error')
    }
  }
</script>

<style>
.block-create-modal__block-type-list .block-type-list__types {
  @apply
  grid-cols-1
}

.block-create-modal--schema-creation .p-modal__footer {
  @apply
  hidden
}
</style>

<template>
  <p-modal v-model:showModal="internalShowModal" class="block-create-modal" :title="modalTitle">
    <BlockTypeList
      v-if="!blockType"
      v-model:capability="capability"
      class="block-create-modal__block-type-list"
      use-emit
      :block-types="orderedBlockTypes"
      @add="handleAdd"
    />

    <template v-if="blockType">
      <template v-if="blockSchema">
        <BlockSchemaCreateForm :key="blockSchema.id" :block-schema="blockSchema" @cancel="cancel" @submit="submit" />
      </template>
    </template>
    <template #cancel>
      <p-button v-show="!blockType" @click="cancel">
        Cancel
      </p-button>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { showToast } from '@prefecthq/prefect-design'
  import { useSubscriptionWithDependencies, useSubscription } from '@prefecthq/vue-compositions'
  import { ref, computed } from 'vue'
  import { BlockDocument } from '..'
  import BlockSchemaCreateForm from '@/components/BlockSchemaCreateForm.vue'
  import BlockTypeList from '@/components/BlockTypeList.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { useBlockTypesFilter } from '@/compositions/filters'
  import { localization } from '@/localization'
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

  const modalTitle = computed(() => {
    // if (blockType.value) {
    //   return `Add a ${blockType.value.name} block`
    // }
    // if (capability.value) {
    //   return `Add a ${capability.value} block`
    // }
    return 'Add a new block'
  })

  const handleAdd = (selectedBlockType: BlockType): void => {
    blockType.value = selectedBlockType
  }

  const internalShowModal = computed({
    get() {
      return props.showModal
    },
    set(value: boolean) {
      emit('update:showModal', value)
    },
  })

  const cancel = (): void => {
    blockType.value = undefined
    internalShowModal.value = false
  }

  const { filter } = useBlockTypesFilter({
    blockSchemas: {
      blockCapabilities: [capability.value],
    },
  })

  const blockTypesSubscription = useSubscription(api.blockTypes.getBlockTypes, [filter])
  const blockTypes = computed(() => blockTypesSubscription.response ?? [])
  const orderedBlockTypes = computed(() => [...blockTypes.value].filter(blockType => blockType.name !== 'Slack Incoming Webhook'))

  const blockSchemaSubscriptionArgs = computed<Parameters<typeof api.blockSchemas.getBlockSchemaForBlockType> | null>(() => {
    if (!blockType.value) {
      return null
    }

    return [blockType.value.id]
  })

  const blockSchemaSubscription = useSubscriptionWithDependencies(api.blockSchemas.getBlockSchemaForBlockType, blockSchemaSubscriptionArgs)
  const blockSchema = computed(() => blockSchemaSubscription.response)

  function submit(request: BlockDocumentCreateNamed): void {
    api.blockDocuments
      .createBlockDocument(request)
      .then((blockDocument) => onSuccess(blockDocument))
      .catch((error) => {
        console.error(error)
        const message = getApiErrorMessage(error, localization.error.createBlock)
        showToast(message, 'error')
      })
  }

  const onSuccess = (blockDocument: BlockDocument): void => {
    emit('refresh', blockDocument)
  }
</script>

<style>
.block-create-modal__block-type-list {
  .block-type-list__types { @apply
    grid-cols-1
  }
}
</style>

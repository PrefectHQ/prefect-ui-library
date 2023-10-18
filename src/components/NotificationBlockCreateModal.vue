<template>
  <p-modal v-model:showModal="internalShowModal" class="notification-block-create-modal" title="Add Notification Block">
    <BlockTypeList v-if="!blockType" v-model:capability="capability" use-emit :block-types="blockTypes" @add="handleAdd" />

    <template v-if="blockType">
      <template v-if="blockSchema">
        <BlockSchemaCreateForm :key="blockSchema.id" :block-schema="blockSchema" @submit="refresh" />
      </template>
    </template>
  </p-modal>
</template>

<script lang="ts" setup>
  import { WizardStep, showToast } from '@prefecthq/prefect-design'
  import { useSubscriptionWithDependencies, useSubscription } from '@prefecthq/vue-compositions'
  import { ref, computed, Ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { BlockTypeCardLayout, BlockSchemaCreateForm } from '@/components'
  import AutomationNotificationWizardBlockStep from '@/components/AutomationNotificationWizardBlockStep.vue'
  import BlockTypeList from '@/components/BlockTypeList.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { useBlockTypesFilter } from '@/compositions/filters'
  import { localization } from '@/localization'
  import { BlockDocumentCreateNamed } from '@/models/BlockDocumentCreate'
  import { BlockType } from '@/models/BlockType'
  import { getApiErrorMessage } from '@/utilities/errors'


  const router = useRouter()
  const api = useWorkspaceApi()


  const blockType: Ref<BlockType | undefined> = ref(undefined)


  const blockSchemaSubscriptionArgs = computed<Parameters<typeof api.blockSchemas.getBlockSchemaForBlockType> | null>(() => {
    if (!blockType.value) {
      return null
    }

    return [blockType.value.id]
  })

  const blockSchemaSubscription = useSubscriptionWithDependencies(api.blockSchemas.getBlockSchemaForBlockType, blockSchemaSubscriptionArgs)
  const blockSchema = computed(() => blockSchemaSubscription.response)

  // function submit(request: BlockDocumentCreateNamed): void {
  //   api.blockDocuments
  //     .createBlockDocument(request)
  //     .then(() => onSuccess())
  //     .catch((error) => {
  //       console.error(error)
  //       const message = getApiErrorMessage(error, localization.error.createBlock)
  //       showToast(message, 'error')
  //     })
  // }


  const refresh = (): void => {
    console.log('refreshing in modal')
    emit('refresh')
  }

  function cancel(): void {
    router.back()
  }

  function onSuccess(): void {
    showToast(localization.success.createBlock, 'success')
    internalShowModal.value = false
  }

  const props = defineProps<{
    showModal: boolean,
  }>()

  const handleAdd = (selectedBlockType: BlockType): void => {
    console.log(selectedBlockType)
    blockType.value = selectedBlockType

  }


  const capability = ref('notify')
  const { filter } = useBlockTypesFilter({
    blockSchemas: {
      blockCapabilities: [capability.value],
    },
  })


  const blockTypesSubscription = useSubscription(api.blockTypes.getBlockTypes, [filter])
  const blockTypes = computed(() => blockTypesSubscription.response ?? [],
  )


  const emit = defineEmits<{
    (event: 'update:showModal', value: boolean): void,
    (event: 'refresh'): void,
  }>()

  // const steps: WizardStep[] = [
  //   { title: 'Block Type', key: 'block-type' },
  //   { title: 'Details', key: 'block-document-information' },
  // ]


  const internalShowModal = computed({
    get() {
      return props.showModal
    },
    set(value: boolean) {
      emit('update:showModal', value)
    },
  })
</script>

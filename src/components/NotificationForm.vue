<template>
  <p-form class="notification-form" @submit="submit" @cancel="cancel">
    <p class="notification-form__message">
      Choose which flow run states and tags trigger this notification.
    </p>

    <div class="notification-form__horizontal-fields">
      <p-label label="Run states">
        <StateSelect v-model:selected="selectedStates" empty-message="All States" />
      </p-label>

      <p-label label="Tags (Optional)">
        <p-tags-input v-model="selectedTags" empty-message="All Tags" />
      </p-label>
    </div>

    <p-button-group v-model="selectedBlockTypeId" :options="buttonGroup" />

    <template v-if="blockSchema">
      <BlockSchemaFormFields v-model:data="data" :block-schema="blockSchema" />
    </template>

    <p class="notification-form__message">
      Review your notification.
    </p>

    <div class="notification-form__review-block">
      <template v-if="notification && blockType">
        <NotificationDetails :notification="notification" :block-type="blockType" :data="data" />
      </template>
    </div>
    <template #footer="{ disabled, loading }">
      <p-button inset @click="cancel">
        Cancel
      </p-button>
      <p-button type="submit" :disabled="disabled" :loading="loading">
        Submit
      </p-button>
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { PLabel, PTagsInput, PForm, PButtonGroup, showToast } from '@prefecthq/prefect-design'
  import { useSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { useForm } from 'vee-validate'
  import { computed, watchEffect, ref } from 'vue'
  import BlockSchemaFormFields from './BlockSchemaFormFields.vue'
  import NotificationDetails from './NotificationDetails.vue'
  import StateSelect from '@/components/StateSelect.vue'
  import { Notification, BlockTypeFilter, BlockDocumentData, NotificationCreate } from '@/models'
  import { blockDocumentsApiKey, blockSchemasApiKey, blockTypesApiKey } from '@/services'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    notification: Partial<Notification>,
  }>()

  const emit = defineEmits<{
    (event: 'update:notification', value: Partial<Notification>): void,
    (event: 'submit', value: NotificationCreate): void,
    (event: 'cancel'): void,
  }>()

  const { handleSubmit } = useForm()
  const blockDocumentsApi = inject(blockDocumentsApiKey)
  const blockTypesApi = inject(blockTypesApiKey)
  const blockSchemasApi = inject(blockSchemasApiKey)
  const selectedBlockTypeId = ref<string>()
  const data = ref<BlockDocumentData>({})

  const selectedStates = computed({
    get(): string[] {
      return props.notification.stateNames ?? []
    },
    set(stateNames: string[]) {
      emit('update:notification', { ...props.notification, stateNames })
    },
  })

  const selectedTags = computed({
    get(): string[] {
      return props.notification.tags ?? []
    },
    set(tags: string[]) {
      emit('update:notification', { ...props.notification, tags })
    },
  })

  const blockDocumentSubscriptionArgs = computed<Parameters<typeof blockDocumentsApi.getBlockDocument> | null>(() => {
    if (!props.notification.blockDocumentId) {
      return null
    }

    return [props.notification.blockDocumentId]
  })
  const blockDocumentSubscription = useSubscriptionWithDependencies(blockDocumentsApi.getBlockDocument, blockDocumentSubscriptionArgs)
  const blockDocument = computed(() => blockDocumentSubscription.response)

  watchEffect(() => {
    if (!blockDocument.value) {
      return
    }

    selectedBlockTypeId.value = blockDocument.value.blockTypeId
    data.value = blockDocument.value.data
  })

  const blockTypesSubscriptionFilter: BlockTypeFilter = {
    blockSchemas: {
      blockCapabilities: {
        all_: ['notify'],
      },
    },
  }
  const blockTypesSubscription = useSubscription(blockTypesApi.getBlockTypes, [blockTypesSubscriptionFilter])
  const blockTypes = computed(() => blockTypesSubscription.response ?? [])
  const blockType = computed(() => blockTypes.value.find(type => type.id === selectedBlockTypeId.value))

  const buttonGroup = computed(() => blockTypes.value.map(type => ({
    label: type.name,
    value: type.id,
  })))

  watchEffect(() => {
    if (selectedBlockTypeId.value) {
      return
    }

    if (blockTypes.value.length) {
      selectedBlockTypeId.value = blockTypes.value[0].id
    }
  })

  const blockSchemaSubscriptionArgs = computed<Parameters<typeof blockSchemasApi.getBlockSchemas> | null>(() => {
    if (!selectedBlockTypeId.value) {
      return null
    }

    if (blockDocument.value && selectedBlockTypeId.value === blockDocument.value.blockTypeId) {
      return null
    }

    return [
      {
        blockSchemas: {
          blockTypeId: {
            any_: [selectedBlockTypeId.value as string],
          },
        },
      },
    ]
  })
  const blockSchemaSubscription = useSubscriptionWithDependencies(blockSchemasApi.getBlockSchemas, blockSchemaSubscriptionArgs)
  const blockSchema = computed(() => {
    if (blockDocument.value && selectedBlockTypeId.value === blockDocument.value.blockTypeId) {
      return blockDocument.value.blockSchema
    }

    return blockSchemaSubscription.response?.[0]
  })


  const submit = handleSubmit(async () => {
    if (blockSchema.value === undefined || selectedBlockTypeId.value === undefined) {
      showToast('Failed to submit notification')
      return
    }

    try {
      const { id: blockDocumentId } = await blockDocumentsApi.createBlockDocument({
        isAnonymous: true,
        blockSchemaId: blockSchema.value.id,
        blockTypeId: selectedBlockTypeId.value,
        data: data.value,
      })
      const notification = { ...props.notification, blockDocumentId }

      emit('update:notification', notification)
      emit('submit', notification)
    } catch (err) {
      showToast('Failed to submit notification')
    }
  })

  function cancel(): void {
    emit('cancel')
  }
</script>

<style>
.notification-form {
  @apply
  border-[1px]
  border-gray-300
  p-6
  rounded-lg
}
.notification-form__message {
  @apply
  text-base
  text-gray-500
}
.notification-form__horizontal-fields {
  @apply
  flex
  gap-4
}
.notification-form__review-block {
  @apply
  border-[3px]
  border-prefect-100
  rounded-lg
  p-4
  pb-6
}
</style>
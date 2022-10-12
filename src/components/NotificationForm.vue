<template>
  <p-form class="notification-form" @submit="submit" @cancel="cancel">
    <p class="notification-form__message">
      Choose which flow run states and tags trigger this notification.
    </p>

    <div class="notification-form__horizontal-fields">
      <p-label label="Run states">
        <StateSelect v-model:selected="stateNames" empty-message="All states" />
      </p-label>

      <p-label label="Tags (Optional)">
        <p-tags-input v-model="tags" empty-message="All tags" />
      </p-label>
    </div>

    <p-button-group v-model="selectedBlockTypeId" :options="buttonGroup" />

    <template v-if="blockSchema && data">
      <SchemaFormFields :schema="blockSchema.fields" property="blockData" />
    </template>

    <p class="notification-form__message">
      Review your notification.
    </p>

    <div class="notification-form__review-block">
      <template v-if="blockType && data">
        <NotificationDetails :notification="{ stateNames, tags }" :block-type="blockType" :data="data" />
      </template>
    </div>

    <template #footer>
      <p-button inset @click="cancel">
        Cancel
      </p-button>
      <SubmitButton :action="action" />
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { PLabel, PTagsInput, PForm, PButtonGroup, showToast } from '@prefecthq/prefect-design'
  import { useSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { useField, useForm } from 'vee-validate'
  import { computed, watchEffect, ref, watch, reactive } from 'vue'
  import NotificationDetails from './NotificationDetails.vue'
  import SchemaFormFields from './SchemaFormFields.vue'
  import SubmitButton from './SubmitButton.vue'
  import StateSelect from '@/components/StateSelect.vue'
  import { useBlockSchemaForBlockType, useReactiveField } from '@/compositions'
  import { localization } from '@/localization'
  import { Notification, BlockTypeFilter } from '@/models'
  import { blockDocumentsApiKey, blockTypesApiKey } from '@/services'
  import { getSchemaDefaultValues } from '@/services/schemas/utilities'
  import { FormAction } from '@/types/buttons'
  import { SchemaValues } from '@/types/schemas'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    notification?: Notification,
    action?: FormAction,
  }>()

  const emit = defineEmits<{
    (event: 'update:notification' | 'submit', value: Partial<Notification>): void,
    (event: 'cancel'): void,
  }>()

  const { handleSubmit } = useForm<{
    stateNames: string[],
    tags: string[],
    blockData: SchemaValues,
  }>({
    initialValues: {
      stateNames: props.notification?.stateNames ?? [],
      tags: props.notification?.tags ?? [],
      blockData: {},
    },
  })

  const { value: stateNames } = useField<string[]>('stateNames')
  const { value: tags } = useField<string[]>('tags')

  const blockDocumentsApi = inject(blockDocumentsApiKey)
  const blockTypesApi = inject(blockTypesApiKey)

  const selectedBlockTypeId = ref<string>()
  const blockDataMap = reactive<Record<string, SchemaValues | undefined>>({})

  const data = computed({
    get() {
      if (selectedBlockTypeId.value === undefined || blockSchema.value === undefined) {
        return undefined
      }

      const data = blockDataMap[selectedBlockTypeId.value]

      if (!data) {
        return getSchemaDefaultValues(blockSchema.value.fields)
      }

      return data
    },
    set(value: SchemaValues | undefined) {
      if (selectedBlockTypeId.value === undefined) {
        return
      }

      blockDataMap[selectedBlockTypeId.value] = value
    },
  })

  useReactiveField(data, 'blockData')

  const blockDocumentSubscriptionArgs = computed<Parameters<typeof blockDocumentsApi.getBlockDocument> | null>(() => {
    if (!props.notification?.blockDocumentId) {
      return null
    }

    return [props.notification.blockDocumentId]
  })
  const blockDocumentSubscription = useSubscriptionWithDependencies(blockDocumentsApi.getBlockDocument, blockDocumentSubscriptionArgs)
  const blockDocument = computed(() => blockDocumentSubscription.response)

  watch(blockDocument, document => {
    if (!document) {
      return
    }

    selectedBlockTypeId.value = document.blockTypeId
    data.value = document.data
  }, { immediate: true })

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
    if (selectedBlockTypeId.value || props.notification?.blockDocumentId) {
      return
    }

    if (blockTypes.value.length) {
      selectedBlockTypeId.value = blockTypes.value[0].id
    }
  })

  const blockTypeId = computed<string | null>(() => {
    if (!selectedBlockTypeId.value) {
      return null
    }

    if (blockDocument.value && selectedBlockTypeId.value === blockDocument.value.blockTypeId) {
      return null
    }

    return selectedBlockTypeId.value
  })
  const blockSchemaForSelectedBlockType = useBlockSchemaForBlockType(blockTypeId)
  const blockSchema = computed(() => {
    if (blockDocument.value && selectedBlockTypeId.value === blockDocument.value.blockTypeId) {
      return blockDocument.value.blockSchema
    }

    return blockSchemaForSelectedBlockType.value
  })

  const blockDocumentId = ref<string>()

  const submit = handleSubmit(async (values) => {
    if (blockSchema.value === undefined || selectedBlockTypeId.value === undefined || data.value === undefined) {
      showToast(localization.error.submitNotification)
      return
    }

    try {
      if (
        blockDocument.value?.id &&
        blockDocument.value.blockSchemaId === blockSchema.value.id &&
        blockDocument.value.blockTypeId === selectedBlockTypeId.value
      ) {
        blockDocumentId.value = blockDocument.value.id
        await blockDocumentsApi.updateBlockDocument(blockDocumentId.value, {
          blockSchema: blockSchema.value,
          data: data.value,
        })
      } else {
        const newBlockDocument = await blockDocumentsApi.createBlockDocument({
          isAnonymous: true,
          blockSchema: blockSchema.value,
          data: data.value,
        })
        blockDocumentId.value = newBlockDocument.id
      }
      const notification = { ...values, blockDocumentId: blockDocumentId.value }

      emit('update:notification', notification)
      emit('submit', notification)
    } catch (err) {
      showToast(localization.error.submitNotification)
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
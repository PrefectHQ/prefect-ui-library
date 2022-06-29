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
        <p-tags-input v-model:tags="selectedTags" empty-message="All Tags" />
      </p-label>
    </div>

    <p-button-group v-model="selectedBlockTypeId" :options="buttonGroup" />

    <template v-if="blockSchema">
      <BlockSchemaFormFields v-model:data="dataModel" :block-schema="blockSchema" />
    </template>

    <p class="notification-form__message">
      Review your notification.
    </p>

    <div class="notification-form__review-block">
      <template v-if="notification && blockType">
        <NotificationDetails :notification="notification" :block-type="blockType" :block-document-data="data" />
      </template>
    </div>
  </p-form>
</template>

<script lang="ts" setup>
  import { PLabel, PTagsInput, PForm, PButtonGroup } from '@prefecthq/prefect-design'
  import { useSubscription, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed, watch } from 'vue'
  import BlockSchemaFormFields from './BlockSchemaFormFields.vue'
  import NotificationDetails from './NotificationDetails.vue'
  import StateSelect from '@/components/StateSelect.vue'
  import { BlockDocumentData, Notification, BlockType, BlockTypeFilter, BlockSchema } from '@/models'
  import { blockSchemasApiKey, blockTypesApiKey } from '@/services'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    notification: Partial<Notification>,
    blockType?: BlockType,
    data: BlockDocumentData,
  }>()

  const emit = defineEmits<{
    (event: 'update:notification', value: Partial<Notification>): void,
    (event: 'update:data', value: BlockDocumentData): void,
    (event: 'update:blockType', value: BlockType | undefined): void,
    (event: 'cancel'): void,
    (event: 'submit', value: { blockSchema: BlockSchema, blockType: BlockType, data: BlockDocumentData }): void,
  }>()

  const dataModel = computed({
    get(): BlockDocumentData {
      return props.data
    },
    set(value: BlockDocumentData) {
      emit('update:data', value)
    },
  })

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

  const blockTypesApi = inject(blockTypesApiKey)
  const blockTypesSubscriptionFilter: BlockTypeFilter = {
    blockSchemas: {
      blockCapabilities: {
        all_: ['notify'],
      },
    },
  }
  const blockTypesSubscription = useSubscription(blockTypesApi.getBlockTypes, [blockTypesSubscriptionFilter])
  const blockTypes = computed(() => blockTypesSubscription.response ?? [])

  const buttonGroup = computed(() => blockTypes.value.map(type => ({
    label: type.name,
    value: type.id,
  })))

  const selectedBlockTypeId = computed({
    get(): string | undefined {
      return props.blockType?.id
    },
    set(id: string | undefined) {
      const blockType = blockTypes.value.find(type => type.id === id)

      emit('update:blockType', blockType)
    },
  })

  watch(blockTypes, blockTypes => {
    if (props.blockType || selectedBlockTypeId.value) {
      return
    }

    if (blockTypes.length) {
      selectedBlockTypeId.value = blockTypes[0].id
    }
  }, { immediate: true })

  const blockSchemaSubscriptionArgs = computed<Parameters<typeof blockSchemasApi.getBlockSchemas> | null>(() => {
    if (!selectedBlockTypeId.value) {
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

  const blockSchemasApi = inject(blockSchemasApiKey)
  const blockSchemaSubscription = useSubscriptionWithDependencies(blockSchemasApi.getBlockSchemas, blockSchemaSubscriptionArgs)
  const blockSchema = computed(() => blockSchemaSubscription.response?.[0])

  function submit(): void {
    emit('submit', {
      blockType: props.blockType!,
      blockSchema: blockSchema.value!,
      data: props.data,
    })
  }

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
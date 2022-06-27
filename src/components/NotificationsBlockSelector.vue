<template>
  Email vs Slack
  <p-label label="Send notifications to">
    <p-button-group v-model="selectedButton" :options="buttonGroup" />
  </p-label>
  <BlockSchemaFormFields v-model:data="dataModel" :block-schema="blockSchema" />
</template>

  <script lang="ts" setup>
  import { ButtonGroupOption, PButtonGroup, SelectModelValue } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import BlockSchemaFormFields from '@/components/BlockSchemaFormFields.vue'
  import { BlockDocumentData, BlockSchema, BlockSchemaFilter } from '@/models'
  import { blockSchemasApiKey, blockTypesApiKey } from '@/services'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    blockDocumentId?: string,
  }>()

  const emit = defineEmits<{
    (event: 'update:data', value: BlockDocumentData): void,
  }>()

  const emailBlockTypeName = 'Email Addresses'
  const slackBlockTypeName = 'Slack Webhook'

  const buttonGroup: ButtonGroupOption[] = [
    {
      label: 'Email',
      value: emailBlockTypeName,
    },
    {
      label: 'Slack',
      value: slackBlockTypeName,
    },
  ]

  const selectedButton = ref<SelectModelValue>(buttonGroup[0].value)

  const blockSchemasApi = inject(blockSchemasApiKey)
  const blockTypesApi = inject(blockTypesApiKey)

  const blockSchema = (): BlockSchema => {
    if (props.blockDocumentId) {
      const blockSchemaSubscription = useSubscription(blockSchemasApi.getBlockSchema, [props.blockDocumentId])
      const blockSchema = computed(() => blockSchemaSubscription.response)
      console.log(1, blockSchema.value)
      return blockSchema.value!
    }

    const blockTypeSubscription = useSubscription(blockTypesApi.getBlockTypeByName, [selectedButton.value as string])
    const blockTypeId = computed(() => blockTypeSubscription.response?.id)
    const blockSchemaSubscriptionArgs = computed(() => ({
      blockSchemas: {
        blockTypeId: {
          any_: [blockTypeId.value],
        },
      },
    }))
    const blockSchemaSubscription = useSubscription(blockSchemasApi.getBlockSchemas, [blockSchemaSubscriptionArgs as BlockSchemaFilter])
    const blockSchema = computed(() => blockSchemaSubscription.response?.[0])
    return blockSchema.value!
  }


  const dataModel = computed({
    get(): BlockDocumentData {
      return {}
    },
    set(value: BlockDocumentData): void {
      emit('update:data', value)
    },
  })
  </script>

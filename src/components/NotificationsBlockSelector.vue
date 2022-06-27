<template>
  Email vs Slack
  <p-label label="Send notifications to">
    <p-button-group v-model="selectedButton" :options="buttonGroup" />
  </p-label>

  <template v-if="blockSchema">
    <BlockSchemaFormFields v-model:data="dataModel" :block-schema="blockSchema" />
  </template>


  <p-button @click="test">
    Block Schema
  </p-button>
</template>

  <script lang="ts" setup>
  import { ButtonGroupOption, PButtonGroup, SelectModelValue } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import NotificationBlockSelectorFields from './NotificationBlockSelectorFields.vue'

  import BlockSchemaFormFields from '@/components/BlockSchemaFormFields.vue'
  import { BlockSchema, BlockSchemaFilter } from '@/models'
  import { BlockDocumentData } from '@/models/BlockDocument'
  import { blockDocumentsApiKey, blockSchemasApiKey, blockTypesApiKey } from '@/services'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    blockDocumentId?: string,
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

  const blockDocumentsApi = inject(blockDocumentsApiKey)
  const blockSchemasApi = inject(blockSchemasApiKey)
  const blockTypesApi = inject(blockTypesApiKey)

  const test = () => {
    console.log(blockSchema.value)
  }

  // const blockSchema = async (): Promise<BlockSchema> => {
  //   if (props.blockDocumentId) {
  //     return  (await blockDocumentsApi.getBlockDocument(props.blockDocumentId!)).blockSchema
  //   }

  //   const blockTypeId = await (await blockTypesApi.getBlockTypeByName(selectedButton.value as string)).id
  //   const blockSchemaArgs = computed(() => ({
  //     blockSchemas: {
  //       blockTypeId: {
  //         any_: [blockTypeId],
  //       },
  //     },
  //   }))
  //   return (await blockSchemasApi.getBlockSchemas(blockSchemaArgs.value as BlockSchemaFilter))[0]

  // }

  const blockSchema = computed((): BlockSchema => {
    if (props.blockDocumentId) {
      const blockDocumentsSubscription = useSubscription(blockDocumentsApi.getBlockDocument, [props.blockDocumentId])
      const blockSchema = computed(() => blockDocumentsSubscription.response?.blockSchema)

      console.log(2, blockSchema)

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

    console.log(2, blockSchema.value)

    return blockSchema.value!
  })

  const emit = defineEmits<{
    (event: 'update:data', value: BlockDocumentData): void,
  }>()

  const dataModel = computed({
    get(): BlockDocumentData {
      return {}
    },
    set(value: BlockDocumentData): void {
      emit('update:data', value)
    },
  })
</script>

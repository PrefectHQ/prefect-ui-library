<template>
  Email vs Slack
  <p-label label="Send notifications to">
    <p-button-group v-model="selectedButton" :options="buttonGroup" />
  </p-label>

  {{ blockSchema }}
  <BlockSchemaFormFields v-if="blockSchema" v-model:data="dataModel" :block-schema="blockSchema" />
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
  import { mapper } from '@/services/Mapper'
  import { inject } from '@/utilities/inject'


  const props = defineProps<{
    blockDocumentId?: string,
  }>()

  const emailBlockTypeName = 'Email Cloud'
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

  // Block DOCUMENT subscription
  const blockDocumentsSubscription = useSubscription(blockDocumentsApi.getBlockDocument, [props.blockDocumentId!])
  const blockSchemaByDoc = computed(() => blockDocumentsSubscription.response?.blockSchema)

  // Block TYPE subscription
  const blockTypeSubscription = useSubscription(blockTypesApi.getBlockTypeByName, [selectedButton.value as string])
  const blockTypeId = computed(() => blockTypeSubscription.response?.id)
  const blockSchemaSubscriptionArgs = computed(() => ({
    blockSchemas: {
      blockTypeId: {
        any_: [blockTypeId.value],
      },
    },
  }))

  // Block SCHEMA subscription
  const blockSchemaSubscription = useSubscription(blockSchemasApi.getBlockSchemas, [blockSchemaSubscriptionArgs as BlockSchemaFilter])
  const blockSchemaByType = computed(() => blockSchemaSubscription.response?.[0])


  const blockSchema = computed(() => props.blockDocumentId ? blockSchemaByDoc.value! : blockSchemaByType.value!)


  // const blockDocument = props.blockDocumentId ? await blockDocumentsApi.getBlockDocument(props.blockDocumentId) : null

  // const blockSchema = blockDocument?

  // const blockSchema = async () => {
  //   if (props.blockDocumentId) {
  //     const blockDocument = await blockDocumentsApi.getBlockDocument(props.blockDocumentId!).then(response => response)
  //     return blockDocument.blockSchema
  //   }

  //   const blockType = await blockTypesApi.getBlockTypeByName(selectedButton.value as string).then(response => response)
  //   const blockSchemaArgs = computed(() => ({
  //     blockSchemas: {
  //       blockTypeId: {
  //         any_: [blockType.id],
  //       },
  //     },
  //   }))
  //   const blockSchema = await blockSchemasApi.getBlockSchemas(blockSchemaArgs as BlockSchemaFilter).then(response => response[0])
  //   return blockSchema
  // }


  // const blockSchema = async (): Promise<BlockSchema> => {
  //   if (props.blockDocumentId) {
  //     return  (await blockDocumentsApi.getBlockDocument(props.blockDocumentId!)).blockSchema
  //   }

  //   const blockTypeId = (await blockTypesApi.getBlockTypeByName(selectedButton.value as string)).id
  //   const blockSchemaArgs = computed(() => ({
  //     blockSchemas: {
  //       blockTypeId: {
  //         any_: [blockTypeId],
  //       },
  //     },
  //   }))
  //   return (await blockSchemasApi.getBlockSchemas(blockSchemaArgs.value as BlockSchemaFilter))[0]

  // }


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

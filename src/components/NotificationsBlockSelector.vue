<template>
  Email vs Slack
  <p-label label="Send notifications to">
    <p-button-group v-model="selectedButton" :options="buttonGroup" />
  </p-label>
  <BlockSchemaFormFields v-model:data="dataModel" :block-schema="blockSchema" />
</template>

  <script lang="ts" setup>
  import { emit } from 'process'
  import { ButtonGroupOption, PButtonGroup, SelectModelValue } from '@prefecthq/prefect-design'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import BlockSchemaFormFields from '@/components/BlockSchemaFormFields.vue'
  import { BlockDocumentData } from '@/models'
  import { blockSchemasApiKey, blockTypesApiKey } from '@/services'
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

  //
  //
  //
  //
  //
  //
  //
  //
  //
  const blockSchemasApi = inject(blockSchemasApiKey)
  const blockTypesApi = inject(blockTypesApiKey)

  const blockSchema = computed(() => {
    // if blockDocumentId => find block schema
    if (props.blockDocumentId) {
      const blockSchemaSubscription = useSubscription(blockSchemasApi.getBlockSchema, [props.blockDocumentId])
      const blockSchema = computed(() => blockSchemaSubscription.response)
      return blockSchema
    }

    // if NO blockDocumentId => FIND block type BY name => find all block schemas for the type => select schema[0]

    const blockTypeSubscription = useSubscription(blockTypesApi.getBlockTypeByName, [selectedButton.value as string])
    const blockTypeId = computed(() => blockTypeSubscription.response?.id)
    const blockSchemaSubscriptionArgs = computed(() => ({
      blockSchemas: {
        blockTypeId: {
          any_: [blockTypeId.value],
        },
      },
    }))
    const blockSchemaSubscription = useSubscription(blockSchemasApi.getBlockSchemas, [blockSchemaSubscriptionArgs.value])
    const blockSchema = computed(() => blockSchemaSubscription.response?.[0])

    return blockSchema.value
  })


  const dataModel = computed({
    get(): BlockDocumentData {
      return props.data
    },
    set(value: BlockDocumentData): void {
      emit('update:data', value)
    },
  })
  </script>


    <!-- <p-label label="Send notifications to"> -->
    <!-- <p-button-group v-model="selectedSendToType" :options="buttonGroup" @update:model-value="onSendToSelect" /> -->
    <!-- </p-label> -->

    <!--  -->
    <!--  -->
    <!-- <template v-if="selectedSendToType == 'email_addresses'"> -->
    <!-- <p-label label="Addresses"> -->
    <!-- <p-combobox v-model="selectedEmails" allow-unknown-value :options="[]" /> -->
    <!-- </p-label> -->
    <!-- </template> -->
    <!-- <template v-if="selectedSendToType == 'slack'"> -->
    <!-- <p-label label="Credentials"> -->
    <!-- Select Block -->
    <!-- </p-label> -->
    <!-- <p-label label="Channel(s)"> -->
    <!--  -->
    <!-- </p-label> -->
    <!-- </template> -->
    <!--  -->
  </blockschemaformfields>
</template>
<template>
  <div>
    <template v-if="blockSchema">
      <slot :block-schema="blockSchema" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { blockSchemasApiKey, blockTypesApiKey } from '@/services'
  import { inject } from '@/utilities'

  const props = defineProps<{
    blockTypeName: string,
  }>()

  const blockTypesApi = inject(blockTypesApiKey)
  const blockSchemasApi = inject(blockSchemasApiKey)

  const blockTypeSubscription = useSubscription(blockTypesApi.getBlockTypeByName, [props.blockTypeName])
  const blockTypeId = computed(() => blockTypeSubscription.response).value?.id
  const blockSchemaSubscriptionArgs = computed(() => ({
    blockSchemas: {
      blockTypeId: {
        any_: [blockTypeId],
      },
    },
  }))
  const blockSchemaSubscription = useSubscription(blockSchemasApi.getBlockSchemas, [blockSchemaSubscriptionArgs.value])
  const blockSchema = computed(() => blockSchemaSubscription.response?.[0])
</script>
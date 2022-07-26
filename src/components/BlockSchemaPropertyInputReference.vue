<template>
  <p-label class="block-schema-property-input-reference" :label="blockTypeName" :message="errors.join('. ')" :state="state">
    <div class="block-schema-property-input-reference__content">
      <BlockTypeLogo v-if="blockType" :block-type="blockType" />

      <template v-if="blockDocuments.length">
        <BlockDocumentsSelect v-model:selected="model" v-bind="{ blockDocuments, state }" class="block-schema-property-input-reference__select" />
      </template>
      <router-link :to="blockCatalogCreateRoute(blockTypeSlug)">
        <p-button inset>
          Add <p-icon icon="PlusIcon" />
        </p-button>
      </router-link>
    </div>
  </p-label>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import BlockDocumentsSelect from './BlockDocumentsSelect.vue'
  import BlockTypeLogo from './BlockTypeLogo.vue'
  import { useReactiveField } from '@/compositions'
  import { blockCatalogCreateRouteKey } from '@/router/routes'
  import { blockTypesApiKey, isRequired, withMessage } from '@/services'
  import { inject } from '@/utilities'

  const props = defineProps<{
    selected: string | null | undefined,
    blockTypeSlug: string,
    required?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:selected', value: string | null): void,
  }>()

  const model = computed({
    get() {
      return props.selected ?? null
    },
    set(value: string | null) {
      emit('update:selected', value)
    },
  })

  const blockCatalogCreateRoute = inject(blockCatalogCreateRouteKey)
  const blockTypesApi = inject(blockTypesApiKey)

  const blockTypeSlug = computed(() => props.blockTypeSlug)
  const blockTypeName = computed(() => blockType.value?.name ?? '')
  const blockTypeSubscription = useSubscription(blockTypesApi.getBlockTypeBySlug, [blockTypeSlug])
  const blockType = computed(() => blockTypeSubscription.response)
  const blockDocumentsSubscription = useSubscription(blockTypesApi.getBlockDocumentsByBlockTypeSlug, [blockTypeSlug])
  const blockDocuments = computed(() => blockDocumentsSubscription.response ?? [])

  const rules = computed(() => {
    if (!props.required) {
      return undefined
    }

    const message = `${blockTypeName.value} is required`
    const rule = withMessage(isRequired, message)

    return rule
  })

  const { meta: state, errors } = useReactiveField(model, blockTypeName, rules)
</script>

<style>
.block-schema-property-input-reference__content { @apply
  flex
  gap-2
}

.block-schema-property-input-reference__select { @apply
  grow
}
</style>
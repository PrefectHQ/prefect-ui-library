<template>
  <p-label class="block-schema-property-reference-input" :label="blockTypeName" :message="errors.join('. ')" :state="state">
    <div class="block-schema-property-reference-input__content">
      <BlockTypeLogo v-if="blockType" :block-type="blockType" />

      <template v-if="blockDocuments.length">
        <BlockDocumentsSelect v-model:selected="model" v-bind="{ blockDocuments, state }" class="block-schema-property-reference-input__select" />
      </template>

      <router-link :to="blockCatalogCreateRoute(blockTypeName)">
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
  import { useOptionalRules } from '@/compositions/useOptionalRules'
  import { blockCatalogCreateRouteKey } from '@/router/routes'
  import { blockTypesApiKey, isRequired, withMessage } from '@/services'
  import { inject } from '@/utilities'

  const props = defineProps<{
    selected: string | null | undefined,
    blockTypeName: string,
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

  const required = computed(() => props.required ?? false)
  const rules = useOptionalRules(withMessage(isRequired, `${props.blockTypeName} is required`), required)
  const { meta: state, errors } = useReactiveField(model, props.blockTypeName, rules)

  const blockCatalogCreateRoute = inject(blockCatalogCreateRouteKey)
  const blockTypesApi = inject(blockTypesApiKey)

  const blockTypeSubscription = useSubscription(blockTypesApi.getBlockTypeByName, [props.blockTypeName])
  const blockType = computed(() => blockTypeSubscription.response)
  const blockDocumentsSubscription = useSubscription(blockTypesApi.getBlockDocumentsByBlockTypeName, [props.blockTypeName])
  const blockDocuments = computed(() => blockDocumentsSubscription.response ?? [])
</script>

<style>
.block-schema-property-reference-input__content { @apply
  flex
  gap-2
}

.block-schema-property-reference-input__select { @apply
  grow
}
</style>
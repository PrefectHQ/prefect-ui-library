<template>
  <div class="block-document-input">
    <BlockTypeLogo v-if="blockType" :block-type="blockType" />

    <template v-if="blockDocuments.length">
      <BlockDocumentsSelect v-model:selected="model" v-bind="{ blockDocuments }" class="block-document-input__select" />
    </template>
    <router-link v-if="blockTypeSlug" :to="withRedirect(routes.blockCreate(blockTypeSlug))">
      <p-button inset>
        Add <p-icon icon="PlusIcon" />
      </p-button>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import BlockDocumentsSelect from '@/components/BlockDocumentsSelect.vue'
  import BlockTypeLogo from '@/components/BlockTypeLogo.vue'
  import { useWorkspaceApi, useWorkspaceRoutes } from '@/compositions'
  import { withRedirect } from '@/utilities/routes'

  const props = defineProps<{
    modelValue: string | null | undefined,
    blockTypeSlug: string,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string | null | undefined): void,
  }>()

  const model = computed({
    get() {
      return props.modelValue ?? null
    },
    set(value: string | null | undefined) {
      emit('update:modelValue', value)
    },
  })

  const api = useWorkspaceApi()
  const routes = useWorkspaceRoutes()
  const blockTypeSlug = computed(() => props.blockTypeSlug)
  const blockTypeSubscription = useSubscription(api.blockTypes.getBlockTypeBySlug, [blockTypeSlug])
  const blockType = computed(() => blockTypeSubscription.response)
  const blockDocumentsSubscription = useSubscription(api.blockTypes.getBlockDocumentsByBlockTypeSlug, [blockTypeSlug])
  const blockDocuments = computed(() => blockDocumentsSubscription.response ?? [])
</script>

<style>
.block-document-input { @apply
  flex
  items-center
  gap-2
}

.block-document-input__select { @apply
  grow
}
</style>
<template>
  <div class="block-document-input">
    <LogoImage v-if="blockType" :url="blockType.logoUrl" />

    <template v-if="blockDocuments.length">
      <BlockDocumentCombobox v-model:selected="model" v-bind="{ blockDocuments }" class="block-document-input__select" />
    </template>
    <p-button v-if="blockTypeSlug" inset :to="withRedirect(routes.blockCreate(blockTypeSlug))">
      Add <p-icon icon="PlusIcon" />
    </p-button>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import BlockDocumentCombobox from '@/components/BlockDocumentCombobox.vue'
  import LogoImage from '@/components/LogoImage.vue'
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
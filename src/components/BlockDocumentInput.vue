<template>
  <div class="block-document-input">
    <LogoImage v-if="blockType" :url="blockType.logoUrl" />

    <template v-if="blockDocuments.length">
      <BlockDocumentCombobox v-model:selected="model" v-bind="{ blockDocuments }" class="block-document-input__select" />
    </template>
    <p-button v-if="blockTypeSlug" icon-append="PlusIcon" @click="open">
      Add
    </p-button>
    <BlockCreateModal v-if="blockType" v-model:showModal="showModal" :provided-block-type="blockType" @refresh="handleRefresh" />
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import BlockCreateModal from '@/components/BlockCreateModal.vue'
  import BlockDocumentCombobox from '@/components/BlockDocumentCombobox.vue'
  import LogoImage from '@/components/LogoImage.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { useShowModal } from '@/compositions/useShowModal'
  import { BlockDocument } from '@/models'

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

  const { showModal, open, close } = useShowModal()
  const api = useWorkspaceApi()
  const blockTypeSlug = computed(() => props.blockTypeSlug)

  const blockTypeSubscription = useSubscription(api.blockTypes.getBlockTypeBySlug, [blockTypeSlug])
  const blockType = computed(() => blockTypeSubscription.response)
  const blockDocumentsSubscription = useSubscription(api.blockTypes.getBlockDocumentsByBlockTypeSlug, [blockTypeSlug])
  const blockDocuments = computed(() => blockDocumentsSubscription.response ?? [])

  const handleRefresh = async (blockDocument: BlockDocument): Promise<void> => {
    model.value = blockDocument.id
    await blockDocumentsSubscription.refresh()
    close()
  }
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
<template>
  <p-icon-button-menu v-bind="attrs">
    <CopyOverflowMenuItem label="Share View" :item="fullRoute" />
    <p-overflow-menu-item v-if="canSave" @click="openSaveModal">
      Save View
    </p-overflow-menu-item>
    <p-overflow-menu-item v-if="canDelete" inset @click="openDeleteModal">
      Delete View
    </p-overflow-menu-item>

    <p-overflow-menu-item v-if="canSetAsDefault" inset @click="openDeleteModal">
      Set as default
    </p-overflow-menu-item>
    <p-overflow-menu-item v-if="canRemoveAsDefault" inset @click="openDeleteModal">
      Remove as default
    </p-overflow-menu-item>
  </p-icon-button-menu>

  <SaveFilterModal v-model:showModal="showSaveModal" @save="handleSave" />

  <template v-if="internalSavedSearch && canDelete">
    <SavedFiltersDeleteModal v-model:showModal="showDeleteModal" :saved-search="internalSavedSearch" @delete="handleDelete" />
  </template>
</template>

<script lang="ts">
  export default {
    name: 'SavedFiltersMenu',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { computed, useAttrs } from 'vue'
  import { useRoute } from 'vue-router'
  import CopyOverflowMenuItem from '@/components/CopyOverflowMenuItem.vue'
  import SavedFiltersDeleteModal from '@/components/SavedFiltersDeleteModal.vue'
  import SaveFilterModal from '@/components/SaveFilterModal.vue'
  import { useShowModal } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { SavedSearch } from '@/models/SavedSearch'
  import { customSavedSearch, systemDefaultSavedSearch } from '@/utilities/savedFilters'

  const props = defineProps<{
    savedSearch: SavedSearch | null,
    nameOfDefaultFilter: string,
  }>()

  const emit = defineEmits<{
    (event: 'update:selectedSearchOption', value: SavedSearch | null): void,
  }>()

  const attrs = useAttrs()

  const internalSavedSearch = computed({
    get() {
      return props.savedSearch
    },
    set(value) {
      emit('update:selectedSearchOption', value)
    },
  })

  const canSave = computed(() => internalSavedSearch.value?.name === customSavedSearch.name && can.create.saved_search)
  const canDelete = computed(() => internalSavedSearch.value?.id && can.delete.saved_search)

  const isDefault = computed(() => props.nameOfDefaultFilter === internalSavedSearch.value?.name)
  const canSetAsDefault = computed(() => !isDefault.value)
  const canRemoveAsDefault = computed(() => isDefault.value && internalSavedSearch.value?.name !== systemDefaultSavedSearch.name)

  const can = useCan()
  const route = useRoute()
  const fullRoute = computed(() => window.location.origin + route.path)

  const { showModal: showSaveModal, open: openSaveModal } = useShowModal()
  const { showModal: showDeleteModal, open: openDeleteModal } = useShowModal()

  function handleSave(savedSearch: SavedSearch): void {
    internalSavedSearch.value = savedSearch
  }

  function handleDelete(): void {
    internalSavedSearch.value = null
  }
</script>
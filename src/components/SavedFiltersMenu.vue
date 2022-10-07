<template>
  <p-icon-button-menu>
    <CopyOverflowMenuItem label="Share View" :item="fullRoute" />
    <p-overflow-menu-item v-if="internalSavedSearch?.name === customSavedSearch.name && can.create.saved_search" @click="openSaveModal">
      Save View
    </p-overflow-menu-item>
    <p-overflow-menu-item v-if="internalSavedSearch?.id && can.delete.saved_search" inset @click="openDeleteModal">
      Delete View
    </p-overflow-menu-item>
  </p-icon-button-menu>
  <SaveFilterModal v-model:showModal="showSaveModal" @save="handleSave" />
  <SavedFiltersDeleteModal v-if="internalSavedSearch?.id" v-model:showModal="showDeleteModal" :selected-search-option="internalSavedSearch" @delete="handleDelete" />
</template>

<script lang="ts">
  export default {
    name: 'SavedFiltersMenu',
    expose: [],
    inheritAttrs: false,
  }
</script>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import CopyOverflowMenuItem from '@/components/CopyOverflowMenuItem.vue'
  import SavedFiltersDeleteModal from '@/components/SavedFiltersDeleteModal.vue'
  import SaveFilterModal from '@/components/SaveFilterModal.vue'
  import { useShowModal } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { SavedSearch, SearchOption } from '@/models/SavedSearch'
  import { customSavedSearch } from '@/utilities/savedFilters'

  const props = defineProps<{
    selectedSearchOption: SearchOption | null,
  }>()

  const emit = defineEmits<{
    (event: 'update:selectedSearchOption', value: SearchOption | null): void,
  }>()

  const internalSavedSearch = computed({
    get() {
      return props.selectedSearchOption
    },
    set(value: SearchOption | null) {
      emit('update:selectedSearchOption', value)
    },
  })

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
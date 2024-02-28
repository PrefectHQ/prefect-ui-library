<template>
  <p-icon-button-menu v-bind="attrs">
    <CopyOverflowMenuItem label="Share View" :item="fullRoute" />
    <p-overflow-menu-item v-if="canSave" @click="openSaveModal">
      Save View
    </p-overflow-menu-item>
    <p-overflow-menu-item v-if="canDelete" inset @click="openDeleteModal">
      Delete View
    </p-overflow-menu-item>

    <p-overflow-menu-item v-if="canToggleDefault" inset @click="toggleDefault">
      <template v-if="savedSearch?.isDefault">
        Remove as default
      </template>

      <template v-else>
        Set as default
      </template>
    </p-overflow-menu-item>
  </p-icon-button-menu>

  <template v-if="savedSearch">
    <SaveFilterModal v-model:showModal="showSaveModal" :saved-search="savedSearch" @save="handleSave" />
  </template>

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
  import { useDefaultSavedSearchFilter } from '@/compositions/useDefaultSavedSearchFilter'
  import { SavedFlowRunsSearch } from '@/compositions/useSavedFlowRunsSearches'
  import { SavedSearch } from '@/models/SavedSearch'
  import { customPartialSearch, unsavedPartialSearch } from '@/utilities/savedFilters'

  const props = defineProps<{
    savedSearch: SavedFlowRunsSearch | null,
  }>()

  const emit = defineEmits<{
    (event: 'update:selectedSearchOption', value: SavedFlowRunsSearch | null): void,
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

  const isCustomUnsavedFilter = computed(() => internalSavedSearch.value?.name === customPartialSearch.name || internalSavedSearch.value?.name === unsavedPartialSearch.name)
  const canSave = computed(() => isCustomUnsavedFilter.value && can.create.saved_search)
  const canDelete = computed(() => internalSavedSearch.value?.id && can.delete.saved_search)

  const canToggleDefault = computed(() => {
    // can't set the default to an unsaved filter. save it first
    if (isCustomUnsavedFilter.value) {
      return false
    }
    // can't remove the system default
    if (props.savedSearch?.isDefault && !defaultSavedSearchFilter.isCustom.value) {
      return false
    }
    return true
  })

  const defaultSavedSearchFilter = useDefaultSavedSearchFilter()
  function toggleDefault(): void {
    if (props.savedSearch?.isDefault) {
      defaultSavedSearchFilter.remove()
    } else if (props.savedSearch) {
      defaultSavedSearchFilter.set(props.savedSearch.filters)
    }
  }

  const can = useCan()
  const route = useRoute()
  const fullRoute = computed(() => window.location.origin + route.fullPath)

  const { showModal: showSaveModal, open: openSaveModal } = useShowModal()
  const { showModal: showDeleteModal, open: openDeleteModal } = useShowModal()

  function handleSave(savedSearch: SavedSearch): void {
    internalSavedSearch.value = { ...savedSearch, isDefault: false }
  }

  function handleDelete(): void {
    internalSavedSearch.value = null
  }
</script>
<template>
  <div class="variable-link" />
  <p-button v-if="variable.valueString.length > 64" size="sm" @click="openEditModal">
    {{ valueOverflowText }}
  </p-button>
  <p-code-highlight v-else :text="variable.valueString" lang="json" inline />
  <VariableEditModal v-model:showModal="showEditModal" :variable="variable" @update="handleUpdate" />
</template>


<script lang="ts" setup>
  import VariableEditModal from '@/components/VariableEditModal.vue'
  import { useShowModal } from '@/compositions/useShowModal'
  import { Variable } from '@/models/Variable'

  defineProps<{
    variable: Variable,
    valueOverflowText?: string,
  }>()

  const { showModal: showEditModal, open: openEditModal } = useShowModal()

  const emit = defineEmits<{
    (event: 'update', value: Variable): void,
  }>()

  const handleUpdate = (variable: Variable): void => {
    emit('update', variable)
  }
</script>
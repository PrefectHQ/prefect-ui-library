<template>
  <div class="variable-link" />
  <p-button v-if="defaultDisplay" size="sm" @click="openEditModal">
    {{ defaultDisplay }}
  </p-button>
  <p-link v-else @click="openEditModal">
    {{ variable.name }}
  </p-link>
  <VariableEditModal v-model:showModal="showEditModal" :variable="variable" @update="handleUpdate" />
</template>


<script lang="ts" setup>
  import VariableEditModal from '@/components/VariableEditModal.vue'
  import { useShowModal } from '@/compositions/useShowModal'
  import { Variable } from '@/models/Variable'

  defineProps<{
    variable: Variable,
    defaultDisplay?: string,
  }>()

  const { showModal: showEditModal, open: openEditModal } = useShowModal()

  const emit = defineEmits<{
    (event: 'update', value: Variable): void,
  }>()

  const handleUpdate = (variable: Variable): void => {
    emit('update', variable)
  }
</script>


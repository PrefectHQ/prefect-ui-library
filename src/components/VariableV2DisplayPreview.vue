<template>
  <div class="variable-link" />
  <p-button v-if="variable.valueString.length > 64" size="sm" @click="openEditModal">
    {{ valueOverflowText }}
  </p-button>
  <p-code-highlight v-else :text="variable.valueString" lang="json" inline />
  <VariableV2EditModal v-model:showModal="showEditModal" :variable="variable" @update="handleUpdate" />
</template>


<script lang="ts" setup>
  import VariableV2EditModal from '@/components/VariableV2EditModal.vue'
  import { useShowModal } from '@/compositions/useShowModal'
  import { VariableV2 } from '@/models/VariableV2'

  defineProps<{
    variable: VariableV2,
    valueOverflowText?: string,
  }>()

  const { showModal: showEditModal, open: openEditModal } = useShowModal()

  const emit = defineEmits<{
    (event: 'update', value: VariableV2): void,
  }>()

  const handleUpdate = (variable: VariableV2): void => {
    emit('update', variable)
  }
</script>
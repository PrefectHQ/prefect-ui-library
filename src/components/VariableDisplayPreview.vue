<template>
  <div class="variable-link" />
  <p-button v-if="(value?.length ?? 0) > 64" size="sm" @click="openEditModal">
    {{ valueOverflowText }}
  </p-button>
  <p-code-highlight v-else :text="value ?? ''" lang="json" inline />
  <VariableEditModal v-model:showModal="showEditModal" :variable="variable" @update="handleUpdate" />
</template>


<script lang="ts" setup>
  import { computed } from 'vue'
  import { stringifyUnknownJson } from '..'
  import VariableEditModal from '@/components/VariableEditModal.vue'
  import { useShowModal } from '@/compositions/useShowModal'
  import { Variable } from '@/models/Variable'

  const props = defineProps<{
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

  const value = computed(() => {
    return stringifyUnknownJson(props.variable.value)
  })
</script>


<template>
  <ConfirmDeleteModal v-model:showModal="showModal" :name="name" @delete="emits('delete')">
    <template #default="{ toggle }">
      <p-overflow-menu-item label="Delete" @click="toggle" />
    </template>
  </ConfirmDeleteModal>
</template>

<script lang="ts" setup>
  import { POverflowMenuItem } from '@prefecthq/prefect-design'
  import { ref } from 'vue'
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal.vue'

  defineProps<{
    name: string,
  }>()

  const showModal = ref(false)
  const emits = defineEmits(['delete'])
</script>
